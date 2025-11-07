import * as dotenvx from "@dotenvx/dotenvx";
import { getEnvironmentVars } from "../../utils/env";
import { resolvePathToCwd } from "../../utils/url";

dotenvx.config({
	path: resolvePathToCwd("/apps/backend/.env"),
});

export const ENVIRONMENT = getEnvironmentVars();
