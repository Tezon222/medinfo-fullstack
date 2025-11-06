import { fallBackRouteSchemaKey, type FallBackRouteSchemaKey } from "@zayne-labs/callapi/constants";
import { defineSchema, defineSchemaRoutes } from "@zayne-labs/callapi/utils";
import { z } from "zod";

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
	/* eslint-disable perfectionist/sort-objects */
	name: z.string(),
	description: z.string(),
	/* eslint-enable perfectionist/sort-objects */
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
	errors: z.record(z.string(), z.string()).nullable(),
	message: z.string(),
	status: z.literal("error"),
});

export type BaseApiSuccessResponse<TData = z.infer<typeof BaseSuccessResponseSchema.shape.data>> = Omit<
	z.infer<typeof BaseSuccessResponseSchema>,
	"data"
> & {
	data: TData;
};

export type BaseApiErrorResponse<TErrors = z.infer<typeof BaseErrorResponseSchema>["errors"]> = Omit<
	z.infer<typeof BaseErrorResponseSchema>,
	"errors"
> & {
	errors: TErrors;
};

const withBaseSuccessResponse = <TSchemaObject extends z.ZodType>(dataSchema: TSchemaObject) =>
	z.object({
		...BaseSuccessResponseSchema.shape,
		data: dataSchema,
	});

const withBaseErrorResponse = <
	TSchemaObject extends z.ZodType = typeof BaseErrorResponseSchema.shape.errors,
>(
	errorSchema?: TSchemaObject
) =>
	z.object({
		...BaseErrorResponseSchema.shape,
		errors: (errorSchema ?? BaseErrorResponseSchema.shape.errors) as NonNullable<TSchemaObject>,
	});

const defaultSchemaRoute = defineSchemaRoutes({
	[fallBackRouteSchemaKey]: {
		errorData: withBaseErrorResponse(),
	},
});

const stringWithNumberValidation = (key: string) =>
	z
		.string()
		.transform(Number)
		.refine((value) => !Number.isNaN(value), `${key} must be a number`)
		.refine((value) => value > 0, `${key} must be greater than 0`);

const healthTipRoutes = defineSchemaRoutes({
	"@get/health-tips/all": {
		data: withBaseSuccessResponse(
			z.array(HealthTipSchema.omit({ lastUpdated: true, mainContent: true }))
		),
		query: z.object({ limit: stringWithNumberValidation("Limit") }).partial(),
	},

	"@get/health-tips/one/:id": {
		data: withBaseSuccessResponse(HealthTipSchema),
		params: z.object({ id: z.string() }),
	},
});

const diseaseRoutes = defineSchemaRoutes({
	"@delete/diseases/delete": {
		body: z.object({
			name: z.string(),
		}),
		data: withBaseSuccessResponse(z.null()),
	},

	"@get/diseases/all": {
		data: withBaseSuccessResponse(
			z.object({
				// eslint-disable-next-line perfectionist/sort-objects
				diseases: z.array(DiseaseSchema.pick({ name: true, description: true, image: true })),
				limit: z.number(),
				page: z.number(),
				total: z.number(),
			})
		),
		query: z
			.object({
				limit: stringWithNumberValidation("Limit"),
				page: stringWithNumberValidation("Page"),
			})
			.partial(),
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
		body: z.object({
			details: DiseaseSchema,
		}),
		data: withBaseSuccessResponse(DiseaseSchema),
	},
});

export const backendApiSchema = defineSchema(
	{
		...defaultSchemaRoute,
		...diseaseRoutes,
		...healthTipRoutes,
	},
	{ strict: true }
);

export const backendApiSchemaRoutes = backendApiSchema.routes;

export type RouteSchemaKeys = Exclude<keyof typeof backendApiSchemaRoutes, FallBackRouteSchemaKey>;

export type BackendApiSchemaRoutes = Omit<typeof backendApiSchemaRoutes, FallBackRouteSchemaKey>;

export type DiseaseSchemaType = z.infer<typeof DiseaseSchema>;

export type HealthTipSchemaType = z.infer<typeof HealthTipSchema>;
