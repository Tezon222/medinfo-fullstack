import { fallBackRouteSchemaKey } from "@zayne-labs/callapi/constants";
import { defineSchema, defineSchemaRoutes } from "@zayne-labs/callapi/utils";
import { z } from "zod";

//#region src/validation/backendApiSchema.ts
const HealthTipSchema = z.object({
	id: z.string(),
	imageAlt: z.string(),
	imageUrl: z.string(),
	lastUpdated: z.string(),
	mainContent: z.array(
		z.object({
			content: z.string(),
			title: z.string(),
		})
	),
	title: z.string(),
});
const DiseaseSchema = z.object({
	name: z.string(),
	description: z.string(),
	image: z.url(),
	precautions: z.array(z.string()),
	symptoms: z.array(z.string()),
});
const BaseSuccessResponseSchema = z.object({
	data: z.record(z.string(), z.unknown()),
	message: z.string(),
	status: z.literal("success"),
});
const BaseErrorResponseSchema = z.object({
	errors: z.record(z.string(), z.string().or(z.array(z.string()))).or(z.undefined()),
	message: z.string(),
	status: z.literal("error"),
});
const withBaseSuccessResponse = (dataSchema) =>
	z.object({
		...BaseSuccessResponseSchema.shape,
		data: dataSchema,
	});
const withBaseErrorResponse = (errorSchema) =>
	z.object({
		...BaseErrorResponseSchema.shape,
		errors: errorSchema ?? BaseErrorResponseSchema.shape.errors,
	});
const defaultSchemaRoute = defineSchemaRoutes({
	[fallBackRouteSchemaKey]: { errorData: withBaseErrorResponse() },
});
const stringWithNumberValidation = (key) =>
	z
		.transform(String)
		.transform(Number)
		.refine((value) => !Number.isNaN(value), `${key} must be a number`)
		.refine((value) => value > 0, `${key} must be greater than 0`);
const healthTipRoutes = defineSchemaRoutes({
	"@get/health-tips/all": {
		data: withBaseSuccessResponse(
			z.array(
				HealthTipSchema.omit({
					lastUpdated: true,
					mainContent: true,
				})
			)
		),
		query: z
			.object({ limit: stringWithNumberValidation("Limit") })
			.partial()
			.optional(),
	},
	"@get/health-tips/one/:id": {
		data: withBaseSuccessResponse(HealthTipSchema),
		params: z.object({ id: z.string() }),
	},
});
const diseaseRoutes = defineSchemaRoutes({
	"@delete/diseases/delete": {
		body: z.object({ name: z.string() }),
		data: withBaseSuccessResponse(z.null()),
	},
	"@get/diseases/all": {
		data: withBaseSuccessResponse(
			z.object({
				diseases: z.array(
					DiseaseSchema.pick({
						name: true,
						description: true,
						image: true,
					})
				),
				limit: z.number(),
				page: z.number(),
				total: z.number(),
			})
		),
		query: z
			.object({
				limit: stringWithNumberValidation("Limit"),
				page: stringWithNumberValidation("Page"),
				random: z
					.transform(String)
					.transform((value) => {
						if (value === "true") return true;
						if (value === "false") return false;
						return "unknown";
					})
					.refine((value) => value !== "unknown", "random must be 'true' or 'false'"),
			})
			.partial()
			.optional(),
	},
	"@get/diseases/one/:name": {
		data: withBaseSuccessResponse(DiseaseSchema),
		params: z.object({ name: z.string() }),
	},
	"@patch/diseases/update": {
		body: z.object({
			details: DiseaseSchema,
			name: z.string(),
		}),
		data: withBaseSuccessResponse(DiseaseSchema),
	},
	"@post/diseases/add": {
		body: z.object({ details: DiseaseSchema }),
		data: withBaseSuccessResponse(DiseaseSchema),
	},
});
const backendApiSchema = defineSchema(
	{
		...defaultSchemaRoute,
		...diseaseRoutes,
		...healthTipRoutes,
	},
	{ strict: true }
);
const backendApiSchemaRoutes = backendApiSchema.routes;

//#endregion
export { backendApiSchema, backendApiSchemaRoutes };
//# sourceMappingURL=backendApiSchema.mjs.map
