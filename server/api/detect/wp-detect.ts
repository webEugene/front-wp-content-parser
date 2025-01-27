import { z } from 'zod';
import { fetchPostsApi } from '~/server/utils/fetchPosts';
import { urlSchema } from "~/server/schemas/urlSchema";

export default defineEventHandler(async (event) => {
	const wpDetectSchema = z.object({
		data: z.object({
			isWp: z.boolean(),
			url: z.string(),
		}),
	});
	const query = await getValidatedQuery(event, urlSchema.safeParse);

	if (!query.success) {
		throw createError({ data: query.error.format() });
	}

	const { getWpDetectCheck } = fetchPostsApi();

	const response = await getWpDetectCheck(query.data.url, event.node.req.headers.host);

	const parsed = wpDetectSchema.safeParse(response);

	if (!parsed.success) {
		throw createError({ data: parsed.error.format() });
	}

	return {
		...parsed.data
	};
});
