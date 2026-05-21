import { InsertAppointmentSchema, SelectAppointmentSchema } from "@medinfo/db/schema/appointments";
import { InsertUserSchema, SelectUserSchema } from "@medinfo/db/schema/auth";
import { InsertDiseaseSchema } from "@medinfo/db/schema/diseases";
import type { InferAllMainRouteKeys, InferAllMainRoutes } from "@zayne-labs/callapi";
import { fallBackRouteSchemaKey } from "@zayne-labs/callapi/constants";
import { defineSchema, defineSchemaRoutes } from "@zayne-labs/callapi/utils";
import { z } from "zod";

const BaseSuccessResponseSchema = z.object({
	data: z.record(z.string(), z.unknown()),
	message: z.string(),
	status: z.literal("success"),
});

const BaseErrorResponseSchema = z.object({
	errors: z.record(z.string(), z.array(z.string())).optional(),
	message: z.string(),
	status: z.literal("error"),
});

export type BaseApiSuccessResponse<TData = z.infer<typeof BaseSuccessResponseSchema.shape.data>> = Omit<
	z.infer<typeof BaseSuccessResponseSchema>,
	"data"
> & { data: TData };

export type BaseApiErrorResponse<TErrors = z.infer<typeof BaseErrorResponseSchema>["errors"]> = Omit<
	z.infer<typeof BaseErrorResponseSchema>,
	"errors"
> & { errors: TErrors };

const withBaseSuccessResponse = <T extends z.ZodType>(dataSchema: T) =>
	BaseSuccessResponseSchema.extend({ data: dataSchema });

const withBaseErrorResponse = <T extends z.ZodType = typeof BaseErrorResponseSchema.shape.errors>(
	errorSchema?: T
) =>
	BaseErrorResponseSchema.extend({
		errors: (errorSchema ?? BaseErrorResponseSchema.shape.errors) as NonNullable<T>,
	});

const PasswordSchema = z.string().min(8, "Password must be at least 8 characters long");

const TokenObjectSchema = z.object({
	expiresAt: z.preprocess((v: string) => new Date(v), z.date()),
	token: z.string(),
});

const stringWithNumberValidation = () => z.preprocess((v: string) => Number(v), z.int().positive());

const stringWithBooleanValidation = () =>
	z.preprocess((value: string) => {
		if (value === "true") {
			return true;
		}

		if (value === "false") {
			return false;
		}

		return value;
	}, z.boolean());

export const withMatchingPasswordFields = <
	TPasswordKey extends "newPassword" | "password",
	TConfirmPasswordKey extends "confirmNewPassword" | "confirmPassword",
	TSchema extends z.ZodObject<Record<TConfirmPasswordKey | TPasswordKey, z.ZodType>>,
>(options: {
	confirmPasswordKey: TConfirmPasswordKey;
	passwordKey: TPasswordKey;
	schema: TSchema;
}) => {
	const { confirmPasswordKey, passwordKey, schema } = options;

	return schema.refine((data) => data[passwordKey as never] === data[confirmPasswordKey as never], {
		error: "Passwords do not match",
		path: [confirmPasswordKey],
	});
};

const defaultSchemaRoute = defineSchemaRoutes({
	[fallBackRouteSchemaKey]: {
		errorData: withBaseErrorResponse(),
	},
});

const BaseSignUpSchema = InsertUserSchema.pick({
	dob: true,
	gender: true,
	role: true,
}).extend({
	country: z.string(),
	email: z.email("Please enter a valid email"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	medicalLicense: z.file().optional(),
	password: PasswordSchema,
	specialty: z.string().optional(),
});

export const SignUpSchema = BaseSignUpSchema.superRefine((data, ctx) => {
	if (data.role === "doctor" && !data.medicalLicense) {
		ctx.addIssue({
			code: "custom",
			message: "Medical certificate is required for doctors",
			path: ["medicalLicense"],
		});
	}

	if (data.role === "doctor" && !data.specialty) {
		ctx.addIssue({
			code: "custom",
			message: "Specialty is required for doctors",
			path: ["specialty"],
		});
	}
});

const authRoutes = () => {
	const PatientSchema = SelectUserSchema.pick({
		avatar: true,
		bio: true,
		city: true,
		country: true,
		email: true,
		firstName: true,
		fullName: true,
		gender: true,
		lastName: true,
		role: true,
	});

	const DoctorRequiredSchema = SelectUserSchema.pick({
		medicalLicense: true,
		specialty: true,
	});

	const UserSchema = z.object({
		...PatientSchema.shape,
		...DoctorRequiredSchema.shape,
	});

	const AuthTokensSchema = z.object({
		access: TokenObjectSchema,
		refresh: TokenObjectSchema,
	});

	const AuthSuccessResponseSchema = withBaseSuccessResponse(
		z.object({
			user: UserSchema,
		})
	);

	const NullSuccessResponseSchema = withBaseSuccessResponse(z.null());

	return defineSchemaRoutes({
		"@get/auth/google": {
			data: withBaseSuccessResponse(
				z.object({
					authURL: z.url(),
				})
			),
			query: UserSchema.pick({
				role: true,
			}).superRefine((data, ctx) => {
				if (data.role === "doctor") {
					ctx.addIssue({
						code: "custom",
						message:
							"Doctors cannot signup with google due to requirements like license and specialty",
					});
				}
			}),
		},

		"@get/auth/google/callback": {
			query: z.object({
				code: z.string(),
				state: z.string(),
			}),
		},

		"@get/auth/session": {
			data: AuthSuccessResponseSchema,
		},

		"@get/auth/signout": {
			data: NullSuccessResponseSchema,
		},

		"@patch/auth/change-password": {
			body: withMatchingPasswordFields({
				confirmPasswordKey: "confirmNewPassword",
				passwordKey: "newPassword",
				schema: z.object({
					confirmNewPassword: PasswordSchema,
					currentPassword: z.string().min(1, "Current password is required"),
					newPassword: PasswordSchema,
				}),
			}),
			data: NullSuccessResponseSchema,
		},

		"@patch/auth/update-profile": {
			body: UserSchema.pick({
				bio: true,
				city: true,
				country: true,
				email: true,
				firstName: true,
				gender: true,
				lastName: true,
			}).partial(),
			data: AuthSuccessResponseSchema,
		},

		"@post/auth/forgot-password": {
			body: BaseSignUpSchema.pick({
				email: true,
			}),
			data: NullSuccessResponseSchema,
		},

		"@post/auth/resend-verification-email": {
			body: BaseSignUpSchema.pick({
				email: true,
			}),
			data: NullSuccessResponseSchema,
		},

		"@post/auth/reset-password": {
			body: withMatchingPasswordFields({
				confirmPasswordKey: "confirmNewPassword",
				passwordKey: "newPassword",
				schema: z.object({
					confirmNewPassword: PasswordSchema,
					newPassword: PasswordSchema,
					token: z.string().min(1, "Reset token is required"),
				}),
			}),
			data: NullSuccessResponseSchema,
		},

		"@post/auth/signin": {
			body: BaseSignUpSchema.pick({
				email: true,
				password: true,
			}),
			data: withBaseSuccessResponse(
				z.object({
					tokens: AuthTokensSchema,
					user: UserSchema,
				})
			),
		},

		"@post/auth/signup": {
			body: z.instanceof(FormData),
			data: AuthSuccessResponseSchema,
		},

		"@post/auth/verify-email": {
			body: BaseSignUpSchema.pick({
				email: true,
			}).extend({
				code: z.string().length(6, "Code must be 6 digits long"),
			}),
			data: withBaseSuccessResponse(
				z.object({
					user: UserSchema.pick({
						email: true,
						role: true,
					}),
				})
			),
		},
	});
};

const HealthTipSchema = z.object({
	id: z.string(),
	imageAlt: z.string(),
	imageUrl: z.string(),
	lastUpdated: z.string(),
	mainContent: z.array(
		z.object({
			content: z.string(),
			title: z.string(),
		})
	),
	title: z.string(),
});

const healthTipRoutes = defineSchemaRoutes({
	"@get/health-tips/all": {
		data: withBaseSuccessResponse(HealthTipSchema.array()),
		query: z
			.object({
				limit: stringWithNumberValidation(),
			})
			.partial()
			.optional(),
	},

	"@get/health-tips/one/:id": {
		data: withBaseSuccessResponse(HealthTipSchema),
		params: z.object({
			id: z.string(),
		}),
	},
});

const diseaseRoutes = () => {
	const DiseaseDataSchema = InsertDiseaseSchema.pick({
		description: true,
		image: true,
		name: true,
		precautions: true,
		symptoms: true,
	});

	return defineSchemaRoutes({
		"@delete/diseases/delete": {
			body: DiseaseDataSchema.pick({
				name: true,
			}),
			data: withBaseSuccessResponse(z.null()),
		},

		"@get/diseases/all": {
			data: withBaseSuccessResponse(
				z.object({
					diseases: DiseaseDataSchema.omit({ precautions: true, symptoms: true }).array(),
					pagination: z.object({
						limit: z.int().positive(),
						page: z.int().positive(),
						total: z.int().positive(),
					}),
				})
			),
			query: z
				.object({
					limit: stringWithNumberValidation(),
					page: stringWithNumberValidation(),
					random: stringWithBooleanValidation(),
				})
				.partial()
				.optional(),
		},

		"@get/diseases/one/:name": {
			data: withBaseSuccessResponse(DiseaseDataSchema),
			params: z.object({
				name: z.string(),
			}),
		},

		"@patch/diseases/update": {
			body: DiseaseDataSchema.partial().extend({
				name: InsertDiseaseSchema.shape.name,
			}),
			data: withBaseSuccessResponse(DiseaseDataSchema),
		},

		"@post/diseases/add": {
			body: DiseaseDataSchema,
			data: withBaseSuccessResponse(DiseaseDataSchema),
		},
	});
};

export const DoctorUserSchema = SelectUserSchema.pick({
	avatar: true,
	country: true,
	email: true,
	firstName: true,
	fullName: true,
	gender: true,
	id: true,
	lastName: true,
	role: true,
	specialty: true,
}).extend({
	role: SelectUserSchema.shape.role.extract(["doctor"]),
	specialty: SelectUserSchema.shape.specialty.unwrap(),
});

const appointmentsRoutes = () => {
	const AppointmentDetailsSchema = SelectAppointmentSchema.pick({
		cancelledAt: true,
		dateOfAppointment: true,
		id: true,
		meetingId: true,
		meetingURL: true,
		reason: true,
		status: true,
	});

	const PaginationSchema = z.object({
		limit: z.int().positive(),
		total: z.int().nonnegative(),
	});

	return defineSchemaRoutes({
		"@delete/appointments/cancel": {
			body: z.object({ appointmentId: z.string() }),
			data: withBaseSuccessResponse(z.null()),
		},

		"@get/appointments/doctor/all": {
			data: withBaseSuccessResponse(
				z.object({
					appointments: z.array(
						AppointmentDetailsSchema.extend({
							patient: z.object({
								avatar: z.string(),
								firstName: z.string(),
								fullName: z.string(),
								lastName: z.string(),
							}),
							role: SelectUserSchema.shape.role.extract(["doctor"]),
						})
					),
					pagination: PaginationSchema,
				})
			),

			query: z.object({ limit: stringWithNumberValidation() }).partial().optional(),
		},

		"@get/appointments/patient/all": {
			data: withBaseSuccessResponse(
				z.object({
					appointments: z.array(
						AppointmentDetailsSchema.extend({
							doctor: z.object({
								avatar: z.string(),
								firstName: z.string(),
								fullName: z.string(),
								lastName: z.string(),
							}),
							role: SelectUserSchema.shape.role.extract(["patient"]),
						})
					),
					pagination: PaginationSchema,
				})
			),

			query: z.object({ limit: stringWithNumberValidation() }).partial().optional(),
		},

		"@patch/appointments/status": {
			body: z.object({
				appointmentId: z.string(),
				status: AppointmentDetailsSchema.shape.status.extract(["completed", "confirmed", "cancelled"]),
			}),
			data: withBaseSuccessResponse(z.null()),
		},

		"@post/appointments/book": {
			body: InsertAppointmentSchema.pick({
				allergies: true,
				dateOfAppointment: true,
				doctorId: true,
				existingMedicalConditions: true,
				healthInsurance: true,
				language: true,
				reason: true,
			}).extend({
				agreeToPrivacyPolicy: stringWithBooleanValidation(),
				allowEmailOrSMS: stringWithBooleanValidation(),
				allowInfoDisclosure: stringWithBooleanValidation(),
				allowTeleMedicine: stringWithBooleanValidation(),
				doctorId: z.string(),
				reason: z.string().min(1, "Must provide a reason for the appointment"),
			}),

			data: withBaseSuccessResponse(
				AppointmentDetailsSchema.extend({
					doctorName: z.string(),
					patientName: z.string(),
				})
			),
		},

		"@post/appointments/match-doctor": {
			body: InsertAppointmentSchema.pick({ reason: true }),
			data: withBaseSuccessResponse(
				z.object({
					doctors: DoctorUserSchema.array(),
				})
			),
		},
	});
};

export const backendApiSchema = defineSchema(
	{
		...defaultSchemaRoute,
		...diseaseRoutes(),
		...healthTipRoutes,
		...authRoutes(),
		...appointmentsRoutes(),
	},
	{ strict: true }
);

export const backendApiSchemaRoutes = backendApiSchema.routes;

export type BackendApiRoutes = InferAllMainRoutes<typeof backendApiSchema.routes>;

export type BackendApiRouteKeys = InferAllMainRouteKeys<
	typeof backendApiSchema.routes,
	typeof backendApiSchema.config
>;

export type DiseaseSchemaType = z.infer<typeof InsertDiseaseSchema>;

export type HealthTipSchemaType = z.infer<typeof HealthTipSchema>;

export type DoctorUserSchemaType = z.infer<typeof DoctorUserSchema>;
