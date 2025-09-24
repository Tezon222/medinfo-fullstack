import { type MatchDoctorsResponse, callBackendApiForQuery } from "@/lib/api/callBackendApi";
import { queryOptions } from "@tanstack/react-query";
import type { CallApiExtraOptions } from "@zayne-labs/callapi";

export const matchDoctorsQuery = (
	options?: Pick<CallApiExtraOptions, "onError"> & {
		formData?: Record<string, unknown> | null;
	}
) => {
	const { formData, onError } = options ?? {};

	return queryOptions({
		enabled: Boolean(formData),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["appointments", "match-doctors", formData],
		queryFn: () => {
			return callBackendApiForQuery<MatchDoctorsResponse>("/appointments/match-doctors", {
				method: "POST",
				body: formData,
				onError,
			});
		},
		refetchOnWindowFocus: false,
		retry: false,
		refetchOnReconnect: false,
		staleTime: Infinity,
	});
};

export const bookAppointmentQuery = (
	options?: Pick<CallApiExtraOptions, "onSuccess" | "onError"> & { doctorId?: string }
) => {
	const { doctorId = "", onSuccess, onError } = options ?? {};

	return queryOptions({
		enabled: Boolean(doctorId),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["appointments", "book-appointment", doctorId],
		queryFn: () => {
			return callBackendApiForQuery("/appointments/:doctorId", {
				method: "POST",
				params: { doctorId },
				onSuccess,
				onError,
			});
		},
		retry: false,
		staleTime: Infinity,
	});
};
