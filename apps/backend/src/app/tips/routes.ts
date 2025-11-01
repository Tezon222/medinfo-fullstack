import { omitKeys } from "@zayne-labs/toolkit-core";
import { Hono } from "hono";
import { getRandomHealthTipIds } from "./services/common";
import { healthApi } from "./services/health-api";

const router = new Hono()
	.get("/", async (ctx) => {
		const randomHealthTipIds = getRandomHealthTipIds(6);

		const results = await Promise.all(
			randomHealthTipIds.map((id) => healthApi.getTopicDetails({ TopicId: id }))
		);

		const data = results.map((result) => omitKeys(result.data, ["lastUpdated", "mainContent"]));

		return ctx.json({
			data,
			message: "Health tips retrieved successfully",
			status: "success",
		});
	})
	.get("/:id", async (ctx) => {
		const { id } = ctx.req.param();

		const result = await healthApi.getTopicDetails({ TopicId: id });

		return ctx.json({
			data: result.data,
			message: "Health tip retrieved successfully",
			status: "success",
		});
	});

export { router as tipsRouter };
