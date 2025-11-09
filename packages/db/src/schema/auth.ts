import * as pg from "drizzle-orm/pg-core";

export const users = pg.pgTable("users", {
	avatar: pg.text().notNull(),
	country: pg.text().notNull(),
	createdAt: pg.timestamp({ withTimezone: true }).defaultNow(),
	dob: pg.timestamp({ mode: "string", withTimezone: true }).notNull(),
	email: pg.text().notNull().unique(),
	emailVerifiedAt: pg.timestamp({ withTimezone: true }),
	firstName: pg.text().notNull(),
	gender: pg.text({ enum: ["male", "female"] }).notNull(),
	googleId: pg.text(),
	id: pg.uuid().defaultRandom().primaryKey(),
	isSuspended: pg.boolean().default(false).notNull(),
	lastLoginAt: pg.timestamp({ mode: "string", withTimezone: true }).defaultNow().notNull(),
	lastName: pg.text().notNull(),
	medicalCertificate: pg.text(),
	passwordHash: pg.text().notNull(),
	role: pg
		.text({ enum: ["doctor", "patient"] })
		.default("doctor")
		.notNull(),
	specialty: pg.text(),
});
