import { ENVIRONMENT } from "@medinfo/shared/config/env/backend";
import { defineConfig } from "drizzle-kit";
import * as schema from "./src/schema";

export const dbConnectionString =
	ENVIRONMENT.NODE_ENV === "development" ? ENVIRONMENT.DATABASE_URL_DEV : ENVIRONMENT.DATABASE_URL_PROD;

export const dbDataCasing = "snake_case";

export default defineConfig({
	dbCredentials: {
		url: dbConnectionString,
	},
	dialect: "postgresql",
	out: "./src/migrations",
	schema: "./src/schema",
});
