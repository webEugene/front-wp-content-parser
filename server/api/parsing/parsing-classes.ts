import { fetchPostsApi } from "~/server/utils/fetchPosts";
import { urlSchema } from "~/server/schemas/urlSchema";
import { parseClassesSchema } from "~/server/schemas/parseClassesSchema";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { getWpClasses } = fetchPostsApi();

  const response = await getWpClasses(
    query.data.url,
    event.node.req.headers.host,
  );

  const parsed = parseClassesSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }
  const formatted = () => {
    return {
      site: parsed.data.site,
      pages: parsed.data.pages?.join(", "),
    };
  };

  return formatted();
});
