import * as dotenvx from "@dotenvx/dotenvx";
import { consola } from "consola";
import { z } from "zod";
import path from "node:path";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { fallBackRouteSchemaKey } from "@zayne-labs/callapi/constants";
import { defineSchema, defineSchemaRoutes } from "@zayne-labs/callapi/utils";
import jwt from "jsonwebtoken";
import { validator } from "hono/validator";
import { omitKeys, pickKeys } from "@zayne-labs/toolkit-core";
import fs from "node:fs/promises";
import { createFetchClient } from "@zayne-labs/callapi";

//#region ../../packages/shared/src/validation/envSchema.ts
const envSchema = z.object({
	BACKEND_URL: z.string().default("http://localhost:8000"),
	DATABASE_URL_DEV: z.string(),
	DATABASE_URL_PROD: z.string(),
	NODE_ENV: z.literal(["development", "production"]),
	PORT: z.coerce.number().default(8e3)
});

//#endregion
//#region ../../packages/shared/src/utils/url.ts
/**
* @description Resolves paths absolutely from the project root
* @returns The absolute path
*/
const resolvePathToCwd = (pathName) => {
	const cleanPath = pathName.startsWith("/") ? pathName.slice(1) : pathName;
	return path.resolve(process.cwd(), "../../", cleanPath);
};

//#endregion
//#region ../../packages/shared/src/utils/env.ts
dotenvx.config({ path: resolvePathToCwd("/apps/backend/.env") });
const getEnvironmentVars = () => {
	const result = envSchema.safeParse(process.env);
	if (!result.success) {
		const errorMessage = `Missing required environment variable(s):\n → ${Object.keys(z.flattenError(result.error).fieldErrors).join("\n → ")}`;
		const error = new Error(errorMessage, { cause: z.flattenError(result.error).fieldErrors });
		error.stack = "";
		consola.error(error);
		throw error;
	}
	return result.data;
};

//#endregion
//#region src/config/env.ts
const ENVIRONMENT = getEnvironmentVars();

//#endregion
//#region src/constants/common.ts
const isDevMode = ENVIRONMENT.NODE_ENV === "development";
const isProduction = ENVIRONMENT.NODE_ENV === "production";
const errorCodes = defineEnum({
	BAD_REQUEST: 400,
	CONFLICT: 409,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	PAYMENT_REQUIRED: 402,
	REQUEST_TIMEOUT: 408,
	SERVER_ERROR: 500,
	UNAUTHORIZED: 401,
	VALIDATION_ERROR: 422
}, { unionVariant: "values" });

//#endregion
//#region src/utils/AppError.ts
var AppError = class AppError extends Error {
	errors;
	errorStatus;
	isOperational;
	statusCode;
	constructor(options) {
		const { cause, code: statusCode, errors, message } = options;
		super(message, { cause });
		this.statusCode = statusCode;
		this.errorStatus = String(statusCode).startsWith("5") ? "Failed" : "Error";
		this.isOperational = true;
		this.errors = errors;
	}
	static isError(error) {
		return error instanceof AppError;
	}
};

//#endregion
//#region ../../packages/shared/src/validation/backendApiSchema.ts
const HealthTipSchema = z.object({
	id: z.string(),
	imageAlt: z.string(),
	imageUrl: z.string(),
	lastUpdated: z.string(),
	mainContent: z.array(z.object({
		content: z.string(),
		title: z.string()
	})),
	title: z.string()
});
const DiseaseSchema = z.object({
	name: z.string(),
	description: z.string(),
	image: z.url(),
	precautions: z.array(z.string()),
	symptoms: z.array(z.string())
});
const BaseSuccessResponseSchema = z.object({
	data: z.record(z.string(), z.unknown()),
	message: z.string(),
	status: z.literal("success")
});
const BaseErrorResponseSchema = z.object({
	errors: z.record(z.string(), z.array(z.string())).optional(),
	message: z.string(),
	status: z.literal("error")
});
const withBaseSuccessResponse = (dataSchema) => z.object({
	...BaseSuccessResponseSchema.shape,
	data: dataSchema
});
const withBaseErrorResponse = (errorSchema) => z.object({
	...BaseErrorResponseSchema.shape,
	errors: errorSchema ?? BaseErrorResponseSchema.shape.errors
});
const defaultSchemaRoute = defineSchemaRoutes({ [fallBackRouteSchemaKey]: { errorData: withBaseErrorResponse() } });
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const stringWithNumberValidation = (key) => {
	return z.transform((value) => Number(value)).refine((value) => !Number.isNaN(value), `${capitalize(key)} must be a number`).refine((value) => value > 0, `${capitalize(key)} must be greater than 0`);
};
const healthTipRoutes = defineSchemaRoutes({
	"@get/health-tips/all": {
		data: withBaseSuccessResponse(z.array(HealthTipSchema.omit({
			lastUpdated: true,
			mainContent: true
		}))),
		query: z.object({ limit: stringWithNumberValidation("limit") }).partial().optional()
	},
	"@get/health-tips/one/:id": {
		data: withBaseSuccessResponse(HealthTipSchema),
		params: z.object({ id: z.string() })
	}
});
const diseaseRoutes = defineSchemaRoutes({
	"@delete/diseases/delete": {
		body: z.object({ name: z.string() }),
		data: withBaseSuccessResponse(z.null())
	},
	"@get/diseases/all": {
		data: withBaseSuccessResponse(z.object({
			diseases: z.array(DiseaseSchema.pick({
				name: true,
				description: true,
				image: true
			})),
			limit: z.int().positive(),
			page: z.int().positive(),
			total: z.number()
		})),
		query: z.object({
			limit: stringWithNumberValidation("limit"),
			page: stringWithNumberValidation("page"),
			random: z.transform((value) => {
				if (value === "true") return true;
				if (value === "false") return false;
				return "unknown";
			}).refine((value) => value !== "unknown", "random must be 'true' or 'false'")
		}).partial().optional()
	},
	"@get/diseases/one/:name": {
		data: withBaseSuccessResponse(DiseaseSchema),
		params: z.object({ name: z.string() })
	},
	"@patch/diseases/update": {
		body: z.object({
			details: DiseaseSchema,
			name: z.string()
		}),
		data: withBaseSuccessResponse(DiseaseSchema)
	},
	"@post/diseases/add": {
		body: z.object({ details: DiseaseSchema }),
		data: withBaseSuccessResponse(DiseaseSchema)
	}
});
const backendApiSchema = defineSchema({
	...defaultSchemaRoute,
	...diseaseRoutes,
	...healthTipRoutes
}, { strict: true });
const backendApiSchemaRoutes = backendApiSchema.routes;

//#endregion
//#region src/utils/validation.ts
const prettifyPath = (path$1) => {
	if (!path$1 || path$1.length === 0) return "";
	return ` → at ${path$1.map((segment) => segment.toString()).join(".")}`;
};
const prettifyValidationIssues = (issues) => {
	return issues.map((issue) => `✖ ${issue.message}${prettifyPath(issue.path)}`).join(" | ");
};
const getValidatedValue = async (input, schema, schemaName) => {
	if (!schema) return input;
	const result = await schema.safeParseAsync(input);
	if (!result.success) {
		const message = prettifyValidationIssues(result.error.issues);
		const fieldErrors = z.flattenError(result.error).fieldErrors;
		throw new AppError({
			code: 422,
			errors: fieldErrors,
			message: schemaName ? `(${schemaName.toUpperCase()}) Validation Error: ${message}` : `Validation Error: ${message}`
		});
	}
	return result.data;
};

//#endregion
//#region src/utils/AppJsonResponse.ts
const AppJsonResponse = async (ctx, extra) => {
	const { code: statusCode = 200, data, message, routeSchemaKey } = extra;
	const jsonBody = {
		status: "success",
		message,
		data: await getValidatedValue(data, (routeSchemaKey && backendApiSchemaRoutes[routeSchemaKey])?.data.shape.data, "data")
	};
	return ctx.json(jsonBody, statusCode);
};

//#endregion
//#region src/middlewares/errorHandler/transformError.ts
const handleTimeoutError = (error) => {
	return new AppError({
		cause: error,
		code: 408,
		message: "Request timeout"
	});
};
const handleJWTError = (error) => {
	return new AppError({
		cause: error,
		code: 401,
		message: "Invalid token!"
	});
};
const handleJWTExpiredError = (error) => {
	return new AppError({
		cause: error,
		code: 401,
		message: " Your token has expired!"
	});
};
const transformError = (error) => {
	let modifiedError = error;
	switch (true) {
		case "timeout" in error && error.timeout:
			modifiedError = handleTimeoutError(error);
			break;
		case error instanceof jwt.JsonWebTokenError:
			modifiedError = handleJWTError(error);
			break;
		case error instanceof jwt.TokenExpiredError:
			modifiedError = handleJWTExpiredError(error);
			break;
		default: break;
	}
	return modifiedError;
};

//#endregion
//#region src/middlewares/errorHandler/errorHandler.ts
const errorHandler = (error, ctx) => {
	const modifiedError = transformError(error);
	const errorInfo = {
		status: "error",
		message: modifiedError.message ?? "Something went very wrong!",
		...Boolean(modifiedError.errors) && { errors: modifiedError.errors }
	};
	consola.error(`${error.name}:`, {
		...errorInfo,
		...Boolean(modifiedError.cause) && { cause: modifiedError.cause },
		stack: modifiedError.stack
	});
	const ERROR_LOOKUP = new Map([
		[errorCodes.BAD_REQUEST, () => ctx.json(errorInfo, 400)],
		[errorCodes.CONFLICT, () => ctx.json(errorInfo, 409)],
		[errorCodes.FORBIDDEN, () => ctx.json(errorInfo, 403)],
		[errorCodes.NOT_FOUND, () => ctx.json(errorInfo, 404)],
		[errorCodes.PAYMENT_REQUIRED, () => ctx.json(errorInfo, 402)],
		[errorCodes.REQUEST_TIMEOUT, () => ctx.json(errorInfo, 408)],
		[errorCodes.SERVER_ERROR, () => ctx.json(errorInfo, 500)],
		[errorCodes.UNAUTHORIZED, () => ctx.json(errorInfo, 401)],
		[errorCodes.VALIDATION_ERROR, () => ctx.json(errorInfo, 422)]
	]);
	return (ERROR_LOOKUP.get(modifiedError.statusCode) ?? ERROR_LOOKUP.get(errorCodes.SERVER_ERROR))?.();
};

//#endregion
//#region src/middlewares/notFoundHandler.ts
const notFoundHandler = (ctx) => {
	const message = `No '${ctx.req.method.toUpperCase()}' handler defined for '${ctx.req.url}'. Check the API documentation for more details.`;
	consola.log(message);
	return ctx.json({
		status: "error",
		message
	}, 404);
};

//#endregion
//#region src/middlewares/validateWithZod.ts
const validateWithZod = (target, schema) => {
	return validator(target, async (value) => {
		return await getValidatedValue(value, schema, target);
	});
};

//#endregion
//#region src/app/diseases/services/common.ts
const pathToDiseases = path.join(import.meta.dirname, "..", "db", "diseases.json");
const DiseaseArraySchema = z.array(DiseaseSchema);
const readDiseases = async () => {
	try {
		const result = await fs.readFile(pathToDiseases, "utf8");
		const parsedResult = JSON.parse(result);
		return DiseaseArraySchema.parse(parsedResult);
	} catch (error) {
		throw new AppError({
			cause: error,
			code: 500,
			message: "Error reading from db"
		});
	}
};
const writeToDiseases = async (diseases) => {
	try {
		await fs.writeFile(pathToDiseases, JSON.stringify(diseases, null, 2));
	} catch (error) {
		throw new AppError({
			cause: error,
			code: 500,
			message: "Error writing to db"
		});
	}
};
const shuffleArray = (array) => {
	const shuffledArray = [...array];
	for (let lastIndex = shuffledArray.length - 1; lastIndex > 0; lastIndex--) {
		const randomIndex = Math.floor(Math.random() * (lastIndex + 1));
		[shuffledArray[lastIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[lastIndex]];
	}
	return shuffledArray;
};

//#endregion
//#region src/app/diseases/routes.ts
const diseasesRoutes = new Hono().basePath("/diseases").get("/all", validateWithZod("query", backendApiSchemaRoutes["@get/diseases/all"].query), async (ctx) => {
	const { limit = 6, page = 1, random = false } = ctx.req.valid("query") ?? {};
	const diseasesResult = await readDiseases();
	const shuffledDiseases = random ? shuffleArray(diseasesResult) : diseasesResult;
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	return AppJsonResponse(ctx, {
		data: {
			diseases: shuffledDiseases.slice(startIndex, endIndex).map((disease) => pickKeys(disease, [
				"name",
				"image",
				"description"
			])),
			limit,
			page,
			total: diseasesResult.length
		},
		message: "Diseases retrieved successfully",
		routeSchemaKey: "@get/diseases/all"
	});
}).get("/one/:name", validateWithZod("param", backendApiSchemaRoutes["@get/diseases/one/:name"].params), async (ctx) => {
	const { name: diseaseName } = ctx.req.valid("param");
	const data = (await readDiseases()).find((disease) => disease.name.toLowerCase() === diseaseName.toLowerCase());
	if (!data) throw new AppError({
		code: 404,
		message: "Disease not found"
	});
	return AppJsonResponse(ctx, {
		data,
		message: "Disease retrieved successfully",
		routeSchemaKey: "@get/diseases/one/:name"
	});
}).post("/add", validateWithZod("json", backendApiSchemaRoutes["@post/diseases/add"].body), async (ctx) => {
	const { details } = ctx.req.valid("json");
	const diseaseResult = await readDiseases();
	if (diseaseResult.some((item) => item.name.toLowerCase() === details.name.toLowerCase())) throw new AppError({
		code: 409,
		message: "Disease already exists"
	});
	diseaseResult.push(details);
	await writeToDiseases(diseaseResult);
	return AppJsonResponse(ctx, {
		data: details,
		message: "Diseases add successfully",
		routeSchemaKey: "@post/diseases/add"
	});
}).patch("/update", validateWithZod("json", backendApiSchemaRoutes["@patch/diseases/update"].body), async (ctx) => {
	const { details: diseaseDetails, name: diseaseName } = ctx.req.valid("json");
	const diseasesResult = await readDiseases();
	const disease = diseasesResult.find((item) => item.name.toLowerCase() === diseaseName.toLowerCase());
	if (!disease) throw new AppError({
		code: 404,
		message: "Disease not found"
	});
	const updatedDisease = {
		...disease,
		...diseaseDetails
	};
	diseasesResult.splice(diseasesResult.indexOf(disease), 1, updatedDisease);
	await writeToDiseases(diseasesResult);
	return AppJsonResponse(ctx, {
		data: updatedDisease,
		message: "Disease updated successfully",
		routeSchemaKey: "@patch/diseases/update"
	});
}).delete("/delete", validateWithZod("json", backendApiSchemaRoutes["@delete/diseases/delete"].body), async (ctx) => {
	const { name: diseaseName } = ctx.req.valid("json");
	const result = await readDiseases();
	const disease = result.find((item) => item.name.toLowerCase() === diseaseName.toLowerCase());
	if (!disease) throw new AppError({
		code: 404,
		message: "Disease not found"
	});
	const diseaseIndex = result.indexOf(disease);
	result.splice(diseaseIndex, 1);
	await writeToDiseases(result);
	return AppJsonResponse(ctx, {
		data: null,
		message: "Disease deleted successfully",
		routeSchemaKey: "@delete/diseases/delete"
	});
});

//#endregion
//#region src/app/health-tips/services/common.ts
const generateRandomNumbers = (options) => {
	const { count, max, min = 0 } = options;
	const uniqueNumbers = /* @__PURE__ */ new Set();
	const range = max + 1 - min;
	while (uniqueNumbers.size < count) {
		const randomNumber = Math.floor(Math.random() * range) + min;
		uniqueNumbers.add(randomNumber);
	}
	return [...uniqueNumbers];
};
const healthTipIds = [
	25,
	327,
	329,
	350,
	510,
	512,
	514,
	527,
	528,
	529,
	530,
	531,
	532,
	533,
	534,
	536,
	537,
	538,
	539,
	540,
	541,
	542,
	543,
	544,
	546,
	547,
	549,
	551,
	552,
	553,
	30530,
	30531,
	30532,
	30533,
	30534
];
const getRandomHealthTipIds = (count) => {
	return generateRandomNumbers({
		count,
		max: healthTipIds.length
	}).map((number) => healthTipIds[number]);
};

//#endregion
//#region src/app/health-tips/services/api/apiSchema.ts
const RelatedItemSchema = z.object({
	Id: z.string(),
	Title: z.string(),
	Type: z.string(),
	Url: z.string()
});
const SectionSchema = z.object({
	Content: z.string(),
	Title: z.string().or(z.null())
});
const ResourceSchema = z.object({
	AccessibleVersion: z.string(),
	Categories: z.string(),
	HealthfinderLogo: z.string(),
	HealthfinderUrl: z.string(),
	Id: z.string(),
	ImageAlt: z.string(),
	ImageUrl: z.string(),
	LastUpdate: z.string(),
	MyHFCategory: z.string(),
	MyHFCategoryHeading: z.string(),
	MyHFTitle: z.string(),
	RelatedItems: z.object({ RelatedItem: z.array(RelatedItemSchema) }),
	Sections: z.object({ section: z.array(SectionSchema) }),
	Title: z.string(),
	TranslationId: z.string(),
	Type: z.string()
});
const topicSearchResultSchema = z.object({
	Error: z.string(),
	Language: z.string(),
	Resources: z.object({ Resource: z.array(ResourceSchema) })
});
const healthApiSchema = defineSchema({ "@get/topicsearch.json": {
	data: z.object({ Result: topicSearchResultSchema }),
	query: z.object({
		Lang: z.string().optional(),
		TopicId: z.string().or(z.number())
	}).partial().optional()
} }, { strict: true });
const healthApiSchemaRoutes = healthApiSchema.routes;

//#endregion
//#region src/app/health-tips/services/api/api.ts
const callHealthApi = createFetchClient({
	baseURL: "https://odphp.health.gov/myhealthfinder/api/v4",
	dedupeStrategy: "defer",
	schema: healthApiSchema
});
const getTopicDetails = async (query) => {
	const { data: responseData, error } = await callHealthApi("@get/topicsearch.json", { query });
	if (error) throw new AppError({
		cause: error.originalError,
		code: 500,
		message: error.message
	});
	const resource = responseData.Result.Resources.Resource[0];
	if (!resource) throw new AppError({
		code: 404,
		message: "Resource not found"
	});
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
				title: item.Title ?? ""
			})),
			title: resource.Title
		},
		message: "Topic details retrieved successfully"
	};
};

//#endregion
//#region src/app/health-tips/routes.ts
const healthTipsRoutes = new Hono().basePath("/health-tips").get("/all", validateWithZod("query", backendApiSchemaRoutes["@get/health-tips/all"].query), async (ctx) => {
	const { limit = 6 } = ctx.req.valid("query") ?? {};
	const randomHealthTipIds = getRandomHealthTipIds(limit);
	return AppJsonResponse(ctx, {
		data: (await Promise.all(randomHealthTipIds.map((id) => getTopicDetails({ TopicId: id })))).map((result) => omitKeys(result.data, ["lastUpdated", "mainContent"])),
		message: "Health tips retrieved successfully",
		routeSchemaKey: "@get/health-tips/all"
	});
}).get("/one/:id", validateWithZod("param", backendApiSchemaRoutes["@get/health-tips/one/:id"].params), async (ctx) => {
	const { id } = ctx.req.valid("param");
	return AppJsonResponse(ctx, {
		data: (await getTopicDetails({ TopicId: id })).data,
		message: "Health tip retrieved successfully",
		routeSchemaKey: "@get/health-tips/one/:id"
	});
});

//#endregion
//#region src/constants/corsOptions.ts
const corsOptions = {
	credentials: true,
	origin: ["http://localhost:3000", "https://medical-info.vercel.app"]
};

//#endregion
//#region src/server.ts
const app = new Hono();
/**
*  == Middleware - App Security
*/
app.use("/*", cors(corsOptions));
/**
*  == Middleware - Logger
*  FIXME: Add winston or pino logger later following guide for logging in brave tabs
*/
app.use(logger((...args) => consola.log(...args)));
/**
*  == Route - Health Check
*/
app.get("/", (c) => {
	const message = "Server is up and running!";
	consola.log(message);
	return c.json({ message });
});
/**
*  == Routes - v1
*/
app.basePath("/api/v1").route("", healthTipsRoutes).route("", diseasesRoutes);
/**
*  == Route 404 handler
*/
app.notFound(notFoundHandler);
/**
*  == Central error handler
*/
app.onError(errorHandler);
serve({
	fetch: app.fetch,
	port: ENVIRONMENT.PORT
}, (info) => {
	consola.info(`Server is running on http://localhost:${info.port}`);
});
var server_default = app;

//#endregion
export { server_default as default };