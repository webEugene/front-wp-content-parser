import { z } from 'zod';
import { fetchPostsApi } from '~/server/utils/fetchPosts';

export default defineEventHandler(async (event) => {
	const querySchema = z.object({
		url: z.string().refine(value => !value || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value)),
	});
	const wpDetectSchema = z.object({
		data: z.boolean(),
	});
	const query = await getValidatedQuery(event, querySchema.safeParse);

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
		url: query.data.url,
		...parsed.data
	};
});
