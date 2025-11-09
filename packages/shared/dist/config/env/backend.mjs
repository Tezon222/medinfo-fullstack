import { t as resolvePathToCwd } from "../../url-BwmnySJW.mjs";
import { t as envSchema } from "../../envSchema-DOgiEOFO.mjs";
import { z } from "zod";
import * as dotenvx from "@dotenvx/dotenvx";
import { consola } from "consola";

//#region src/config/env/backend.ts
dotenvx.config({ path: resolvePathToCwd("/apps/backend/.env") });
const result = envSchema.safeParse(process.env);
if (!result.success) {
	const errorMessage = `Missing required environment variable(s):\n → ${Object.keys(z.flattenError(result.error).fieldErrors).join("\n → ")}`;
	const error = new Error(errorMessage, { cause: z.flattenError(result.error).fieldErrors });
	error.stack = "";
	consola.error(error);
	process.exit(1);
}
const ENVIRONMENT = result.data;

//#endregion
export { ENVIRONMENT };
//# sourceMappingURL=backend.mjs.map
