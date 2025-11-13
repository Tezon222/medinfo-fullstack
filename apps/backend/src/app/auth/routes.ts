import { validateWithZod } from "@/middlewares";
import { AppError, AppJsonResponse } from "@/utils";
import { db } from "@medinfo/backend-db";
import { users } from "@medinfo/backend-db/schema/auth";
import { backendApiSchemaRoutes } from "@medinfo/shared/validation/backendApiSchema";
import { pickKeys } from "@zayne-labs/toolkit-core";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateAccessToken, generateRefreshToken, hashValue, setCookie } from "./services/common";

const authRoutes = new Hono()
	.basePath("/auth")
	.post(
		"/signup",
		validateWithZod("json", backendApiSchemaRoutes["@post/auth/signup"].body),
		async (ctx) => {
			const {
				country,
				dob,
				email,
				firstName,
				gender,
				lastName,
				medicalCertificate,
				password,
				role,
				specialty,
			} = ctx.req.valid("json");

			const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

			if (existingUser) {
				throw new AppError({ code: 400, message: "User already exists" });
			}

			const passwordHash = await hashValue(password);

			const avatar = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}`;

			const [newUser] = await db
				.insert(users)
				.values({
					avatar,
					country,
					dob,
					email,
					firstName,
					gender,
					lastName,
					medicalCertificate,
					passwordHash,
					role,
					specialty,
				})
				.returning();

			if (!newUser) {
				throw new AppError({ code: 500, message: "Failed to create user" });
			}

			const accessTokenResult = generateAccessToken(newUser);

			const refreshTokenResult = generateRefreshToken(newUser);

			await db.update(users).set({ refreshTokenArray: [refreshTokenResult.token] });

			setCookie(ctx, "zayneAccessToken", accessTokenResult.token, {
				expires: new Date(accessTokenResult.expiresAt),
			});

			setCookie(ctx, "zayneRefreshToken", refreshTokenResult.token, {
				expires: new Date(refreshTokenResult.expiresAt),
			});

			// TODO: Send Verification email

			return AppJsonResponse(ctx, {
				data: pickKeys(newUser, ["firstName", "lastName", "email", "avatar", "role"]),
				message: "Account created successfully",
				routeSchemaKey: "@post/auth/signup",
			});
		}
	);

export { authRoutes };
