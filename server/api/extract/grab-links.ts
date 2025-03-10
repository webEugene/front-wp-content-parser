import { z } from "zod";
import { fetchPostsApi } from "~/server/utils/fetchPosts";
import { urlSchema } from "~/server/schemas/urlSchema";

export default defineEventHandler(async (event) => {
  const grabbedLinksSchema = z.object({
    domain: z.string(),
    data: z.array(
      z.object({
        link: z.string(),
        title: z.string(),
        duplicate: z.boolean().nullable().optional(),
        origin: z.string().nullable(),
      }),
    ),
  });
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { getGrabbedLinks } = fetchPostsApi();

  const response = await getGrabbedLinks(
    query.data.url,
    event.node.req.headers.host,
  );

  const parsed = grabbedLinksSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }
  return {
    ...parsed.data,
  };
});
