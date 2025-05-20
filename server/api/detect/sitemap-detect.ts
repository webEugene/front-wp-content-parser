import { z } from "zod";
import { fetchPostsApi } from "~/server/utils/fetchPosts";
import { urlSchema } from "~/server/schemas/urlSchema";

export default defineEventHandler(async (event) => {
  const sitemapFindSchema = z.object({
    data: z.array(z.string()),
    statusCode: z.number(),
    error: z.string().nullable(),
  });
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { getSitemapFind } = fetchPostsApi();

  const response = await getSitemapFind(
    query.data.url,
    event.node.req.headers.host,
  );

  const parsed = sitemapFindSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }

  return {
    ...parsed.data,
  };
});
