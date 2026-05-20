import type { SelectUserType } from "@medinfo/db/schema/auth";
import { pickKeys } from "@zayne-labs/toolkit-core";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";

export const necessaryUserDetails = defineEnum([
	"firstName",
	"lastName",
	"fullName",
	"gender",
	"country",
	"email",
	"avatar",
	"role",
	"medicalLicense",
	"specialty",
	"bio",
	"city",
] satisfies Array<keyof SelectUserType>);

export const getNecessaryUserDetails = <const TKeys extends Array<keyof SelectUserType> = []>(
	user: SelectUserType,
	keys: TKeys = [] as never
) => {
	return pickKeys(user, [...necessaryUserDetails, ...keys] as const);
};
