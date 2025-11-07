import * as dotenvx from "@dotenvx/dotenvx";
import { consola } from "consola";
import { getEnvironmentVars } from "../../utils/env";
import { resolvePathToCwd } from "../../utils/url";

dotenvx.config({
	path: resolvePathToCwd("/apps/backend/.env"),
});

export const ENVIRONMENT = getEnvironmentVars();

consola.log({ ENVIRONMENT });
