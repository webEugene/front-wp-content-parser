import { fetchClientApi } from "~/server/utils/fetchClientApi";
import { urlSchema } from "~/server/schemas/urlSchema";
import {
  sitemapSchema,
  type SitemapListType,
} from "~/server/schemas/sitemapSchema";

export default defineEventHandler(async (event): Promise<SitemapListType> => {
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid query",
      data: query.error.format(),
    });
  }

  const { getClientSitemapList } = fetchClientApi(event);

  let response: unknown;

  try {
    response = await getClientSitemapList(query.data.url);
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode ?? 502,
      statusMessage: "External API error",
    });
  }

  const parsed = sitemapSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({
      statusCode: 502,
      statusMessage: "Invalid response from external API",
      data: parsed.error.format(),
    });
  }

  return parsed.data;
});
