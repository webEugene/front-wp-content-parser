import { z } from "zod";
import { fetchPostsApi } from "~/server/utils/fetchPosts";
import { urlSchema } from "~/server/schemas/urlSchema";

export default defineEventHandler(async (event) => {
  const extractedSitemapListSchema = z.object({
    data: z.object({
      total: z.number(),
      allowedLinks: z.array(z.string()),
    }),
  });
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { getExtractedSitemapList } = fetchPostsApi();

  const response = await getExtractedSitemapList(
    query.data.url,
    event.node.req.headers.host
  );

  if (response?.statusCode === 404 || response?.statusCode === 500) {
    return response;
  }

  const parsed = extractedSitemapListSchema.safeParse(response);
  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }

  return {
    ...parsed.data,
  };
});
