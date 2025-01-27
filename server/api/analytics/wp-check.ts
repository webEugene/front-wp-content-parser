import { z } from 'zod';
import { fetchAnalyticsApi } from '~/server/utils/fetchAnalytics';

export default defineEventHandler(async (event) => {
    const analyticSchema = z.array(z.object({
        _id: z.string(),
        website:  z.string(),
        tries: z.number(),
        host:  z.string(),
        wpDetect:  z.boolean(),
    }));

    const { getAnalyticsApi } = fetchAnalyticsApi();

    const response = await getAnalyticsApi();

    const parsed = analyticSchema.safeParse(response);

    if (!parsed.success) {
        throw createError({ data: parsed.error.format() });
    }

    return parsed.data;
});
