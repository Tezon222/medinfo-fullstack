import { z } from "zod";
// import { evaluateString } from "../utils/common";

export const envSchema = z.object({
	BACKEND_URL: z.string().default("http://localhost:8000"),
	DATABASE_URL_DEV: z.string(),
	DATABASE_URL_PROD: z.string(),
	NODE_ENV: z.literal(["development", "production"]),
	PORT: z.coerce.number().default(8000),
});
