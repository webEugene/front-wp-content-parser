import { fetchClientApi } from "~/server/utils/fetchClientApi";
import { urlSchema } from "~/server/schemas/urlSchema";
import {
  grabLinksSchema,
  type GrabLinksType,
} from "~/server/schemas/grabLinksSchema";

export default defineEventHandler(async (event): Promise<GrabLinksType> => {
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid query",
      data: query.error.format(),
    });
  }

  const { getClientGrabbedLinks } = fetchClientApi(event);

  let response: unknown;

  try {
    response = await getClientGrabbedLinks(query.data.url);
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode ?? 502,
      statusMessage: "External API error",
    });
  }

  const parsed = grabLinksSchema.safeParse(response);
  if (!parsed.success) {
    throw createError({
      statusCode: 502,
      statusMessage: "Invalid response from external API",
      data: parsed.error.format(),
    });
  }

  return parsed.data;
});
