import * as pg from "drizzle-orm/pg-core";

export const users = pg.pgTable("users", {
	createdAt: pg.timestamp({ withTimezone: true }).defaultNow(),
	email: pg.text().notNull().unique(),
	emailVerifiedAt: pg.timestamp({ withTimezone: true }),
	firstName: pg.text().notNull(),
	gender: pg.text({ enum: ["male", "female"] }).notNull(),
	googleId: pg.text(),
	id: pg.uuid().defaultRandom().primaryKey(),
	lastLoginAt: pg.timestamp({ withTimezone: true }).defaultNow().notNull(),
	lastName: pg.text().notNull(),
	passwordHash: pg.text().notNull(),
});
