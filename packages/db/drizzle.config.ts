import { ENVIRONMENT } from "@/config/env";
import { defineConfig } from "drizzle-kit";

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
