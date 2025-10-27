import type { ErrorCodesUnion } from "../constants";

class AppError extends Error {
	errors?: unknown;
	errorStatus: string;
	isOperational: boolean;
	statusCode: ErrorCodesUnion;

	constructor(
		statusCode: ErrorCodesUnion,
		message: string,
		options: ErrorOptions & { errors?: unknown } = {}
	) {
		const { cause, errors } = options;

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
