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
		queryFn: () => {
			return callBackendApiForQuery<MatchDoctorsResponse>("/appointments/match-doctors", {
				body: formData,
				method: "POST",
				onError,
			});
		},
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["appointments", "match-doctors", formData],
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		retry: false,
		staleTime: Infinity,
	});
};

export const bookAppointmentQuery = (
	options?: Pick<CallApiExtraOptions, "onError" | "onSuccess"> & { doctorId?: string }
) => {
	const { doctorId = "", onError, onSuccess } = options ?? {};

	return queryOptions({
		enabled: Boolean(doctorId),
		queryFn: () => {
			return callBackendApiForQuery("/appointments/:doctorId", {
				method: "POST",
				onError,
				onSuccess,
				params: { doctorId },
			});
		},
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["appointments", "book-appointment", doctorId],
		retry: false,
		staleTime: Infinity,
	});
};
