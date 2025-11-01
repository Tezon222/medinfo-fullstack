import { serve } from "@hono/node-server";
import { ENVIRONMENT } from "@medinfo/shared/config/env-backend";
import { consola } from "consola";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { tipsRouter } from "./app/tips/routes";
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

/**
 *  == Route - Health Check
 */
app.get("/", (c) => {
	const message = "Server is up and running";

	consola.log(message);

	return c.json({ message });
});

/**
 *  == Routes - v1
 */
const ignoredRoutesV1 = app.basePath("/api/v1").route("/health-tips", tipsRouter);

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
