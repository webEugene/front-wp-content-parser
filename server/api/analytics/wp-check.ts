import { z } from 'zod';
import { fetchAnalyticsApi } from '~/server/utils/fetchAnalytics';

export default defineEventHandler(async (event) => {
	const filterSchema = z.object({
		page: z.number().default(1),
	});
	const query = await getValidatedQuery(event, filterSchema.safeParse);

	if (!query.success) {
		throw createError({ data: query.error.format() });
	}

	const analyticSchema = z.array(z.object({
		_id: z.string(),
		website: z.string(),
		tries: z.number(),
		host: z.string(),
		wpDetect: z.boolean(),
	}));

	const { getAnalyticsApi } = fetchAnalyticsApi();

	const response = await getAnalyticsApi(query);

	const parsed = analyticSchema.safeParse(response);

	if (!parsed.success) {
		throw createError({ data: parsed.error.format() });
	}

	return parsed.data;
});
