import { createMiddleware } from "hono/factory";
import { getCookie, setCookie } from "@/app/auth/services/cookie";
import type { HonoAppBindings } from "@/lib/types/common";
import { requestContext } from "./requestContext";
import { validateUserSession } from "./validateUserSession";

const authMiddleware = createMiddleware<HonoAppBindings>(async (ctx, next) => {
	await requestContext.run({ userAgent: ctx.req.header("user-agent") }, async () => {
		const { currentUser, newZayneAccessTokenResult } = await validateUserSession({
			zayneAccessToken: getCookie(ctx, "zayneMedinfoAccessToken"),
			zayneRefreshToken: getCookie(ctx, "zayneMedinfoRefreshToken"),
		});

		if (newZayneAccessTokenResult) {
			setCookie(ctx, {
				expires: newZayneAccessTokenResult.expiresAt,
				name: "zayneMedinfoAccessToken",
				value: newZayneAccessTokenResult.token,
			});
		}

		ctx.set("currentUser", currentUser);

		await next();
	});
});

export { authMiddleware };
