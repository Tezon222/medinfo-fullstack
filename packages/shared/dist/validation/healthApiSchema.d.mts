import { z } from "zod";

//#region src/validation/healthApiSchema.d.ts
declare const healthApiSchema: {
	config: {
		strict: true;
	};
	routes: {
		"@get/topicsearch.json": {
			data: z.ZodObject<
				{
					Result: z.ZodObject<
						{
							Error: z.ZodString;
							Language: z.ZodString;
							Resources: z.ZodObject<
								{
									Resource: z.ZodTuple<
										[
											z.ZodObject<
												{
													AccessibleVersion: z.ZodString;
													Categories: z.ZodString;
													HealthfinderLogo: z.ZodString;
													HealthfinderUrl: z.ZodString;
													Id: z.ZodString;
													ImageAlt: z.ZodString;
													ImageUrl: z.ZodString;
													LastUpdate: z.ZodString;
													MyHFCategory: z.ZodString;
													MyHFCategoryHeading: z.ZodString;
													MyHFTitle: z.ZodString;
													RelatedItems: z.ZodObject<
														{
															RelatedItem: z.ZodArray<
																z.ZodObject<
																	{
																		Id: z.ZodString;
																		Title: z.ZodString;
																		Type: z.ZodString;
																		Url: z.ZodString;
																	},
																	z.core.$strip
																>
															>;
														},
														z.core.$strip
													>;
													Sections: z.ZodObject<
														{
															section: z.ZodArray<
																z.ZodObject<
																	{
																		Content: z.ZodString;
																		Title: z.ZodString;
																	},
																	z.core.$strip
																>
															>;
														},
														z.core.$strip
													>;
													Title: z.ZodString;
													TranslationId: z.ZodString;
													Type: z.ZodString;
												},
												z.core.$strip
											>,
										],
										null
									>;
								},
								z.core.$strip
							>;
						},
						z.core.$strip
					>;
				},
				z.core.$strip
			>;
			query: z.ZodObject<
				{
					Lang: z.ZodOptional<z.ZodString>;
					TopicId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
				},
				z.core.$strip
			>;
		};
	};
};
declare const healthApiSchemaRoutes: {
	"@get/topicsearch.json": {
		data: z.ZodObject<
			{
				Result: z.ZodObject<
					{
						Error: z.ZodString;
						Language: z.ZodString;
						Resources: z.ZodObject<
							{
								Resource: z.ZodTuple<
									[
										z.ZodObject<
											{
												AccessibleVersion: z.ZodString;
												Categories: z.ZodString;
												HealthfinderLogo: z.ZodString;
												HealthfinderUrl: z.ZodString;
												Id: z.ZodString;
												ImageAlt: z.ZodString;
												ImageUrl: z.ZodString;
												LastUpdate: z.ZodString;
												MyHFCategory: z.ZodString;
												MyHFCategoryHeading: z.ZodString;
												MyHFTitle: z.ZodString;
												RelatedItems: z.ZodObject<
													{
														RelatedItem: z.ZodArray<
															z.ZodObject<
																{
																	Id: z.ZodString;
																	Title: z.ZodString;
																	Type: z.ZodString;
																	Url: z.ZodString;
																},
																z.core.$strip
															>
														>;
													},
													z.core.$strip
												>;
												Sections: z.ZodObject<
													{
														section: z.ZodArray<
															z.ZodObject<
																{
																	Content: z.ZodString;
																	Title: z.ZodString;
																},
																z.core.$strip
															>
														>;
													},
													z.core.$strip
												>;
												Title: z.ZodString;
												TranslationId: z.ZodString;
												Type: z.ZodString;
											},
											z.core.$strip
										>,
									],
									null
								>;
							},
							z.core.$strip
						>;
					},
					z.core.$strip
				>;
			},
			z.core.$strip
		>;
		query: z.ZodObject<
			{
				Lang: z.ZodOptional<z.ZodString>;
				TopicId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
			},
			z.core.$strip
		>;
	};
};
//#endregion
export { healthApiSchema, healthApiSchemaRoutes };
//# sourceMappingURL=healthApiSchema.d.mts.map
