import * as dotenvx from "@dotenvx/dotenvx";
import { consola } from "consola";
import { z } from "zod";
import { envSchema } from "../../validation/envSchema";
import { resolvePathToCwd } from "../../utils/url";

dotenvx.config({
	path: resolvePathToCwd("/apps/backend/.env"),
});

// eslint-disable-next-line node/no-process-env
const result = envSchema.safeParse(process.env);

if (!result.success) {
	const missingKeys = Object.keys(z.flattenError(result.error).fieldErrors);

	const errorMessage = `Missing required environment variable(s):\n → ${missingKeys.join("\n → ")}`;

	const error = new Error(errorMessage, { cause: z.flattenError(result.error).fieldErrors });

	error.stack = "";

	consola.error(error);

	// eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit
	process.exit(1);
}

export const ENVIRONMENT = result.data;
