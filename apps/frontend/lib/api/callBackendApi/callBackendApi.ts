import { createFetchClient, defineBaseConfig } from "@zayne-labs/callapi";
import { toastPlugin, type ToastPluginMeta } from "./plugins";
import { apiSchema } from "./apiSchema";

type GlobalMeta = ToastPluginMeta;

declare module "@zayne-labs/callapi" {
	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const REMOTE_BACKEND_HOST = "https://medinfo-backend-xie7.onrender.com";

// const BACKEND_HOST =
// 	process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : REMOTE_BACKEND_HOST;

const BACKEND_HOST = REMOTE_BACKEND_HOST;

const BASE_API_URL = BACKEND_HOST;

export const sharedBaseConfig = defineBaseConfig((instanceCtx) => ({
	baseURL: BASE_API_URL,
	credentials: "include",
	dedupeCacheScope: "global",
	dedupeCacheScopeKey: instanceCtx.options.baseURL,
	dedupeStrategy: "cancel",

	plugins: [toastPlugin()],

	schema: apiSchema,

	skipAutoMergeFor: "options",

	...(instanceCtx.options as object),

	meta: {
		...instanceCtx.options.meta,

		toast: {
			// endpointsToSkip: {
			// 	errorAndSuccess: ["/token-refresh"],
			// 	success: ["/session"],
			// },
			errorAndSuccess: true,
			errorsToSkip: ["AbortError"],
			...instanceCtx.options.meta?.toast,
		},
	} satisfies GlobalMeta,
}));

export const callBackendApi = createFetchClient(sharedBaseConfig);

export const callBackendApiForQuery = createFetchClient(
	(instanceCtx) =>
		({
			...sharedBaseConfig(instanceCtx),
			resultMode: "onlyData",
			throwOnError: true,
		}) satisfies ReturnType<typeof defineBaseConfig>
);
