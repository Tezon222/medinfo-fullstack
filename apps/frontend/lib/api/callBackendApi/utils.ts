import { callBackendApi } from "./callBackendApi";
import type { TipsResponse } from "./types";

export const getTipsResponse = async () => {
	const { data, error } = await callBackendApi<TipsResponse>("/dailyTips/tips");

	// == Necessary to only return the data and error and not the response object to avoid RSC errors due to the non-serializable response object
	return { data, error };
};
