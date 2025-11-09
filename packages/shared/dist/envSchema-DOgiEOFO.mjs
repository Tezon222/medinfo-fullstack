import { z } from "zod";

//#region src/validation/envSchema.ts
const envSchema = z.object({
	BACKEND_URL: z.string().default("http://localhost:8000"),
	DATABASE_URL: z.string(),
	NODE_ENV: z.literal(["development", "production"]),
	PORT: z.coerce.number().default(8e3),
});

//#endregion
export { envSchema as t };
//# sourceMappingURL=envSchema-DOgiEOFO.mjs.map
