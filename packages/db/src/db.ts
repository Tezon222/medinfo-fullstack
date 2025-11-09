import { drizzle } from "drizzle-orm/node-postgres";
import { dbConnectionString, dbDataCasing } from "../drizzle.config";
import * as schema from "./schema";

export const db = drizzle({
	casing: dbDataCasing,
	connection: dbConnectionString,
	logger: true,
	schema,
});
