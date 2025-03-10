import { z } from 'zod';
import { fetchAnalyticsApi } from '~/server/utils/fetchAnalytics';

export default defineEventHandler(async (event) => {
	const filterSchema = z.object({
		page: z.string().default("1"),
		limit: z.string().default("5")
	});
	const query = await getValidatedQuery(event, filterSchema.safeParse);

	if (!query.success) {
		throw createError({ data: query.error.format() });
	}

	const analyticSchema = z.object({
		items: z.array(z.object({
			_id: z.string(),
			website: z.string(),
			tries: z.number(),
			host: z.string(),
			wpDetect: z.boolean(),
		})).default([]),
		totalPages: z.number(),
	});

	const { getAnalyticsApi } = fetchAnalyticsApi();

	const response = await getAnalyticsApi(query.data);

	const parsed = analyticSchema.safeParse(response);

	if (!parsed.success) {
		throw createError({ data: parsed.error.format() });
	}

	return parsed.data;
});
