import { validateWithZod } from "@/middlewares";
import { AppJsonResponse } from "@/utils/AppJsonResponse";
import { backendApiSchemaRoutes } from "@medinfo/shared/validation/backendApiSchema";
import { omitKeys } from "@zayne-labs/toolkit-core";
import { Hono } from "hono";
import { getRandomHealthTipIds } from "./services/common";
import { healthApi } from "./services/health-api";

const healthTipsRoutes = new Hono()
	.basePath("/health-tips")
	.get(
		"/all",
		validateWithZod("query", backendApiSchemaRoutes["@get/health-tips/all"].query),
		async (ctx) => {
			const { limit = 6 } = ctx.req.valid("query");

			const randomHealthTipIds = getRandomHealthTipIds(Number(limit));

			const results = await Promise.all(
				randomHealthTipIds.map((id) => healthApi.getTopicDetails({ TopicId: id }))
			);

			const data = results.map((result) => omitKeys(result.data, ["lastUpdated", "mainContent"]));

			return AppJsonResponse(ctx, {
				data,
				message: "Health tips retrieved successfully",
				routeSchemaKey: "@get/health-tips/all",
			});
		}
	)
	.get(
		"/one/:id",
		validateWithZod("param", backendApiSchemaRoutes["@get/health-tips/one/:id"].params),
		async (ctx) => {
			const { id } = ctx.req.valid("param");

			const result = await healthApi.getTopicDetails({ TopicId: id });

			return AppJsonResponse(ctx, {
				data: result.data,
				message: "Health tip retrieved successfully",
				routeSchemaKey: "@get/health-tips/one/:id",
			});
		}
	);

export { healthTipsRoutes };
