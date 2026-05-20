import type { db } from "@medinfo/db";
import { emailVerificationCodes, passwordResetTokens, type SelectUserType } from "@medinfo/db/schema/auth";
import { add } from "date-fns";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { generateRandom6DigitCode, generateRandomBytes } from "@/lib/utils/random";
import { addEmailToQueue } from "@/services/queues";
import { hashToken, hashValue } from "./hash";
import { encodeJwtToken } from "./token";

export const sendVerificationEmail = async (
	user: Pick<SelectUserType, "email" | "firstName" | "id">,
	dbClient: typeof db
) => {
	const rawCode = generateRandom6DigitCode();

	const hashedCode = await hashValue(rawCode);

	const codeExpiry = add(new Date(), { minutes: 15 });

	await dbClient
		.insert(emailVerificationCodes)
		.values({
			codeHash: hashedCode,
			expiresAt: codeExpiry,
			userId: user.id,
		})
		.onConflictDoUpdate({
			set: {
				codeHash: hashedCode,
				createdAt: new Date(),
				expiresAt: codeExpiry,
			},
			target: emailVerificationCodes.userId,
		});

	await addEmailToQueue({
		data: {
			email: user.email,
			name: user.firstName,
			to: user.email,
			validationCode: rawCode,
		},
		onError: async () => {
			await dbClient.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, user.id));
		},
		type: "verifyEmail",
	});
};

export const TokenSchema = z.object({
	token: z.string(),
});

export const sendPasswordResetEmail = async (
	user: Pick<SelectUserType, "email" | "firstName" | "id">,
	dbClient: typeof db,
	passwordResetWindowActive: boolean
) => {
	const rawToken = generateRandomBytes();

	const tokenExpiry = add(new Date(), { minutes: 20 });

	const rawEncodedToken = encodeJwtToken({ token: rawToken }, { schema: TokenSchema });

	const hashedToken = hashToken(rawToken);

	await dbClient
		.insert(passwordResetTokens)
		.values({
			email: user.email,
			expiresAt: tokenExpiry,
			retriedAt: new Date(),
			retryCount: 1,
			tokenHash: hashedToken,
			userId: user.id,
		})
		.onConflictDoUpdate({
			set: {
				createdAt: new Date(),
				expiresAt: tokenExpiry,
				retriedAt: passwordResetWindowActive ? passwordResetTokens.retriedAt : new Date(),
				retryCount: passwordResetWindowActive ? sql`${passwordResetTokens.retryCount} + 1` : 1,
				tokenHash: hashedToken,
			},
			target: passwordResetTokens.userId,
		});

	await addEmailToQueue({
		data: {
			name: user.firstName,
			priority: "high",
			to: user.email,
			token: rawEncodedToken,
		},
		onError: async () => {
			await dbClient.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, user.id));
		},
		type: "resetPassword",
	});
};

export const sendResetPasswordCompleteEmail = async (
	user: Pick<SelectUserType, "email" | "firstName">
) => {
	await addEmailToQueue({
		data: {
			name: user.firstName,
			priority: "high",
			to: user.email,
		},
		type: "resetPasswordComplete",
	});
};
