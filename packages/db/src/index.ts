import { drizzle } from "drizzle-orm/node-postgres";
import { dbConnectionString, dbDataCasing } from "../drizzle.config";

export const db = drizzle({
	casing: dbDataCasing,
	connection: dbConnectionString,
});
