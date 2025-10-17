import { z } from "zod";
// import { evaluateString } from "../utils/common";

export const envSchema = z.object({
	BACKEND_URL: z.string().default("http://localhost:8000"),
	DATABASE_URL: z.string(),
	NODE_ENV: z.literal(["development", "production"]),
	PORT: z.coerce.number().default(8000),
});
