import { serve } from "@hono/node-server";
import { ENVIRONMENT } from "@medinfo/shared/config/env-backend";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.use(
	"/*",
	cors({
		credentials: true,
		origin: ["http://localhost:3000"],
	})
);

app.get("/", (c) => {
	return c.json({ message: "OK" });
});

serve(
	{
		fetch: app.fetch,
		port: ENVIRONMENT.PORT,
	},
	(info) => {
		console.info(`Server is running on http://localhost:${info.port}`);
	}
);
