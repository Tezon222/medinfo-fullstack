import type { HTTPException } from "hono/http-exception";
import * as jwt from "jsonwebtoken";
import { AppError } from "../../utils";

const handleTimeoutError = (error: Error) => new AppError(408, "Request timeout", { cause: error });

// prettier-ignore
const handleJWTError = (error: jwt.JsonWebTokenError) => new AppError(401, "Invalid token!", { cause: error });

// prettier-ignore
const handleJWTExpiredError = (error: jwt.TokenExpiredError) => new AppError(401, "Your token has expired!", { cause: error });

export const transformError = (error: AppError | Error | HTTPException) => {
	let modifiedError = error;

	switch (true) {
		case "timeout" in error && error.timeout: {
			modifiedError = handleTimeoutError(error);
			break;
		}

		case error instanceof jwt.JsonWebTokenError: {
			modifiedError = handleJWTError(error);
			break;
		}

		case error instanceof jwt.TokenExpiredError: {
			modifiedError = handleJWTExpiredError(error);
			break;
		}

		default: {
			modifiedError = new AppError(500, error.message, { cause: error });
			break;
		}
	}

	return modifiedError as AppError;
};
