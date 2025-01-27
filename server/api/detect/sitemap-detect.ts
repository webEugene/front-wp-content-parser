import { z } from 'zod';
import { fetchPostsApi } from '~/server/utils/fetchPosts';
import { urlSchema } from "~/server/schemas/urlSchema";

export default defineEventHandler(async (event) => {
    const sitemapDetectSchema = z.object({
        data: z.string(),
    });
    const query = await getValidatedQuery(event, urlSchema.safeParse);

    if (!query.success) {
        throw createError({ data: query.error.format() });
    }

    const { getSitemapDetectCheck } = fetchPostsApi();

    const response = await getSitemapDetectCheck(query.data.url, event.node.req.headers.host);

    const parsed = sitemapDetectSchema.safeParse(response);

    if (!parsed.success) {
        throw createError({ data: parsed.error.format() });
    }

    return {
        ...parsed.data
    };
});
