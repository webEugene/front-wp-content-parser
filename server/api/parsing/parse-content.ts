import { z } from "zod";
import { urlSchema } from "~/server/schemas/urlSchema";
import { fetchPostsApi } from "~/server/utils/fetchPosts";

export default defineEventHandler(async (event) => {
  const classListSchema = z.object({
    ...urlSchema.shape,
    homeTitle: z.string().optional(),
    homeContent: z.string().optional(),
    pageTitle: z.string().optional(),
    pageContent: z.string().optional(),
    singleTitle: z.string().optional(),
    singleContent: z.string().optional(),
    archiveTitle: z.string().optional(),
    archiveContent: z.string().optional(),
    defaultTitle: z.string().optional(),
    defaultContent: z.string().optional(),
  });

  const query = await getValidatedQuery(event, classListSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { parseContent } = fetchPostsApi();

  const response = await parseContent(query.data, event.node.req.headers.host);

  return response;
});
