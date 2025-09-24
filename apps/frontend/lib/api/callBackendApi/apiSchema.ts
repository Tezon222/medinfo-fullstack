import { defineSchema, fallBackRouteSchemaKey } from "@zayne-labs/callapi";
import { z } from "zod";

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

export type BaseApiSuccessResponse = z.infer<typeof BaseSuccessResponseSchema>;

export type BaseApiErrorResponse = z.infer<typeof BaseErrorResponseSchema>;

// eslint-disable-next-line ts-eslint/no-unused-vars
const withBaseSuccessResponse = <TSchemaObject extends z.ZodType>(dataSchema: TSchemaObject) =>
	z.object({
		...BaseSuccessResponseSchema.shape,
		data: dataSchema,
	});

// eslint-disable-next-line ts-eslint/no-unused-vars
const withBaseErrorResponse = <
	TSchemaObject extends z.ZodType = typeof BaseErrorResponseSchema.shape.errors,
>(
	errorSchema?: TSchemaObject
) =>
	z.object({
		...BaseErrorResponseSchema.shape,
		errors: (errorSchema ?? BaseErrorResponseSchema.shape.errors) as NonNullable<TSchemaObject>,
	});

// const toFormData = (data: Record<string, string | Blob>) => {
// 	const formData = new FormData();

// 	for (const [key, value] of Object.entries(data)) {
// 		formData.set(key, value);
// 	}

// 	return formData;
// };

export const apiSchema = defineSchema(
	{
		[fallBackRouteSchemaKey]: {
			// data: withBaseSuccessResponse(BaseSuccessResponseSchema.shape.data),
			errorData: (data) => data as BaseApiErrorResponse,
		},
	},
	{ strict: false }
);
