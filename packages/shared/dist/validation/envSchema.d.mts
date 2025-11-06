import { z } from "zod";

//#region src/validation/envSchema.d.ts
declare const envSchema: z.ZodObject<{
  BACKEND_URL: z.ZodDefault<z.ZodString>;
  DATABASE_URL: z.ZodString;
  NODE_ENV: z.ZodLiteral<"development" | "production">;
  PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//#endregion
export { envSchema };
//# sourceMappingURL=envSchema.d.mts.map