import type { HealthTipSchemaType } from "@medinfo/shared/validation/backendApiSchema";
import { healthApiSchema, type healthApiSchemaRoutes } from "@medinfo/shared/validation/healthApiSchema";
import { createFetchClient } from "@zayne-labs/callapi";
import { z } from "zod";

const BASE_URL = "https://odphp.health.gov/myhealthfinder/api/v4";

const callHealthApi = createFetchClient({
	baseURL: BASE_URL,
	resultMode: "onlyData",
	schema: healthApiSchema,
	throwOnError: true,
});

export const getTopicDetails = async (
	query: z.infer<(typeof healthApiSchemaRoutes)["@get/topicsearch.json"]["query"]>
) => {
	const responseData = await callHealthApi("@get/topicsearch.json", { query });

	const resource = responseData.Result.Resources.Resource[0];

	const lastUpdatedDate = new Date(Number(resource.LastUpdate)).toLocaleDateString();
	const lastUpdatedTime = new Date(Number(resource.LastUpdate)).toLocaleTimeString();

	const data = {
		id: resource.Id,
		imageAlt: resource.ImageAlt,
		imageUrl: resource.ImageUrl,
		lastUpdated: `${lastUpdatedDate} ${lastUpdatedTime}`,
		mainContent: resource.Sections.section.map((item) => ({
			content: item.Content,
			title: item.Title,
		})),
		title: resource.Title,
	} satisfies HealthTipSchemaType;

	return {
		data,
		message: "Topic details retrieved successfully",
	};
};
