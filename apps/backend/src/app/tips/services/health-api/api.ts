import { createFetchClient } from "@zayne-labs/callapi";
import { z } from "zod";
import { healthApiSchema } from "./apiSchema";

const BASE_URL = "https://odphp.health.gov/myhealthfinder/api/v4";

const callHealthApi = createFetchClient({
	baseURL: BASE_URL,
	resultMode: "onlyData",
	schema: healthApiSchema,
	throwOnError: true,
});

export const getTopicDetails = async (
	query: z.infer<(typeof healthApiSchema)["routes"]["@get/topicsearch.json"]["query"]>
) => {
	const data = await callHealthApi("@get/topicsearch.json", { query });

	const resource = data.Result.Resources.Resource[0];

	const lastUpdatedDate = new Date(Number(resource.LastUpdate)).toLocaleDateString();
	const lastUpdatedTime = new Date(Number(resource.LastUpdate)).toLocaleTimeString();

	return {
		data: {
			id: resource.Id,
			imageAlt: resource.ImageAlt,
			imageUrl: resource.ImageUrl,
			lastUpdated: `${lastUpdatedDate} ${lastUpdatedTime}`,
			mainContent: resource.Sections.section.map((item) => ({
				content: item.Content,
				title: item.Title,
			})),
			title: resource.Title,
		},
		message: "Topic details retrieved successfully",
	};
};
