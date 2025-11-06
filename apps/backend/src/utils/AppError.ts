import type { ContentfulStatusCode } from "hono/utils/http-status";

class AppError extends Error {
	errors?: unknown;
	errorStatus: string;
	isOperational: boolean;
	statusCode: ContentfulStatusCode;

	constructor(options: ErrorOptions & { errors?: unknown; message: string; code: ContentfulStatusCode }) {
		const { cause, errors, message, code: statusCode } = options;

		super(message, { cause });

		this.statusCode = statusCode;
		this.errorStatus = String(statusCode).startsWith("5") ? "Failed" : "Error";
		this.isOperational = true;
		this.errors = errors;
	}

	static override isError(error: unknown): error is AppError {
		return error instanceof AppError;
	}
}

export { AppError };
