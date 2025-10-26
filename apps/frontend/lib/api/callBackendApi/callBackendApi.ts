import { createFetchClient } from "@zayne-labs/callapi";
import { defineBaseConfig } from "@zayne-labs/callapi/utils";
import { apiSchema } from "./apiSchema";
import { toastPlugin, type ToastPluginMeta } from "./plugins";

type GlobalMeta = ToastPluginMeta;

declare module "@zayne-labs/callapi" {
	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const REMOTE_BACKEND_HOST = "https://medinfo-backend-xie7.onrender.com";

const BACKEND_HOST =
	process.env.NODE_ENV === "development" ? "http://localhost:8000" : REMOTE_BACKEND_HOST;

// const BACKEND_HOST = REMOTE_BACKEND_HOST;

const BASE_API_URL = BACKEND_HOST;

export const sharedBaseConfig = defineBaseConfig({
	baseURL: BASE_API_URL,
	credentials: "include",
	dedupe: {
		cacheScope: "global",
		cacheScopeKey: (ctx) => ctx.options.baseURL,
	},

	plugins: [
		toastPlugin({
			errorAndSuccess: true,
			errorsToSkip: ["AbortError"],
		}),
	],

	schema: apiSchema,
});

export const callBackendApi = createFetchClient(sharedBaseConfig);

export const callBackendApiForQuery = createFetchClient({
	...sharedBaseConfig,
	resultMode: "onlyData",
	throwOnError: true,
});
