import { defineSchema } from "@zayne-labs/callapi/utils";
import { z } from "zod";

const RelatedItemSchema = z.object({
	Id: z.string(),
	Title: z.string(),
	Type: z.string(),
	Url: z.string(),
});

const SectionSchema = z.object({
	Content: z.string(),
	Title: z.string(),
});

const ResourceSchema = z.object({
	AccessibleVersion: z.string(),
	Categories: z.string(),
	HealthfinderLogo: z.string(),
	HealthfinderUrl: z.string(),
	Id: z.string(),
	ImageAlt: z.string(),
	ImageUrl: z.string(),
	LastUpdate: z.string(),
	MyHFCategory: z.string(),
	MyHFCategoryHeading: z.string(),
	MyHFTitle: z.string(),
	RelatedItems: z.object({ RelatedItem: z.array(RelatedItemSchema) }),
	Sections: z.object({ section: z.array(SectionSchema) }),
	Title: z.string(),
	TranslationId: z.string(),
	Type: z.string(),
});

const topicSearchResultSchema = z.object({
	Error: z.string(),
	Language: z.string(),
	Resources: z.object({ Resource: z.tuple([ResourceSchema]) }),
});

export const healthApiSchema = defineSchema(
	{
		"@get/topicsearch.json": {
			data: z.object({ Result: topicSearchResultSchema }),
			query: z.object({
				Lang: z.string().optional(),
				TopicId: z.string().or(z.number()),
			}),
		},
	},
	{ strict: true }
);
