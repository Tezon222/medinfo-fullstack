import { ENVIRONMENT } from "@medinfo/shared/config/env/backend";
import { defineConfig } from "drizzle-kit";

export const dbConnectionString = ENVIRONMENT.DATABASE_URL;

export const dbDataCasing = "snake_case";

export default defineConfig({
	dbCredentials: {
		url: dbConnectionString,
	},
	dialect: "postgresql",
	out: "./src/migrations",
	schema: "./src/schema",
});
