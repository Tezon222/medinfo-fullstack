import { serve } from "@hono/node-server";
import { ENVIRONMENT } from "@medinfo/shared/config/env-backend";
import { consola } from "consola";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { corsOptions } from "./constants/corsOptions";
import { errorHandler, notFoundHandler } from "./middlewares";

const app = new Hono();

/**
 *  == Middleware - App Security
 */
app.use("/*", cors(corsOptions));

/**
 *  == Middleware - Logger
 *  FIXME: Add winston later following guide for logging in brave tabs
 */
app.use(logger((...args) => consola.log(...args)));

app.get("/", (c) => {
	const message = "Ping!";

	consola.log(message);
	return c.json({ message });
});

/**
 *  == Routes - Health Check
 */
app.get("/api/alive", (c) => {
	return c.json({ message: "Server is up and running" });
});

/**
 *  == Routes - v1
 */

app.get("/api/v1/auth", (c) => {
	return c.json({ message: "Auth endpoint" });
});

/**
 *  == Route 404 handler
 */
app.notFound(notFoundHandler);

/**
 *  == Central error handler
 */
app.onError(errorHandler);

serve({ fetch: app.fetch, port: ENVIRONMENT.PORT }, (info) => {
	consola.info(`Server is running on http://localhost:${info.port}`);
});
