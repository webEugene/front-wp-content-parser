import { fetchClientApi } from "~/server/utils/fetchClientApi";
import { urlSchema } from "~/server/schemas/urlSchema";
import {
  clientWpDetectSchema,
  type ClientWpDetectType,
} from "~/server/schemas/wpDetectSchema";

export default defineEventHandler(
  async (event): Promise<ClientWpDetectType> => {
    const query = await getValidatedQuery(event, urlSchema.safeParse);

    if (!query.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid query",
        data: query.error.format(),
      });
    }

    const { getClientWpCheck } = fetchClientApi(event);

    let response: unknown;

    try {
      response = await getClientWpCheck(query.data.url);
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode ?? 502,
        statusMessage: "External API error",
      });
    }

    const parsed = clientWpDetectSchema.safeParse(response);
    if (!parsed.success) {
      throw createError({
        statusCode: 502,
        statusMessage: "Invalid response from external API",
        data: parsed.error.format(),
      });
    }

    return parsed.data;
  },
);
