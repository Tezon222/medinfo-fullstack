import { AppError } from "@/utils";
import type { backendApiSchemaRoutes } from "@medinfo/shared/validation/backendApiSchema";
import fs from "node:fs/promises";
import path from "node:path";
import type { z } from "zod";

const pathToDiseases = path.join(import.meta.dirname, "..", "db", "diseases.json");

type Disease = z.infer<(typeof backendApiSchemaRoutes)["@get/diseases/one/:name"]["data"]>["data"];

export const readDiseases = async () => {
	try {
		const result = await fs.readFile(pathToDiseases, "utf8");

		return JSON.parse(result) as Disease[];
	} catch (error) {
		throw new AppError({ cause: error, code: 500, message: "Error reading from db" });
	}
};

// export const readDiseases = async () => {
// 	try {
// 		const result = await import("../db/diseases.json");

// 		return result.default satisfies Disease[];
// 	} catch (error) {
// 		throw new AppError({ cause: error, code: 500, message: "Error reading from db" });
// 	}
// };

export const writeToDiseases = async (diseases: Disease[]) => {
	try {
		await fs.writeFile(pathToDiseases, JSON.stringify(diseases, null, 2));
	} catch (error) {
		throw new AppError({ cause: error, code: 500, message: "Error writing to db" });
	}
};
