import { fetchClientApi } from "~/server/utils/fetchClientApi";
import { urlSchema } from "~/server/schemas/urlSchema";
import { clientWPDetectSchema } from "~/server/schemas/wpDetectSchema";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, urlSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }

  const { getClientWpCheck } = fetchClientApi();

  const response = await getClientWpCheck(query.data.url);

  if (response?.statusCode === 404 || response?.statusCode === 500) {
    return response;
  }

  const parsed = clientWPDetectSchema.safeParse(response);
  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }

  return {
    ...parsed.data,
  };
});
