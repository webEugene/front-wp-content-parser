import { fetchPostsApi } from "~/server/utils/fetchPosts";
import { urlSchema } from "~/server/schemas/urlSchema";
import { wpDetectSchema } from "~/server/schemas/wpDetectSchema";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { getWpDetectCheck } = fetchPostsApi();

  const response = await getWpDetectCheck(
    query.data.url,
    event.node.req.headers.host,
  );

  if (response?.statusCode === 404) {
    return response;
  }

  const parsed = wpDetectSchema.safeParse(response);
  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }

  return {
    ...parsed.data,
  };
});
