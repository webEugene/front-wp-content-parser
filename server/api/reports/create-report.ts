import { reportSchema } from "~/server/schemas/reportSchema";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, reportSchema.safeParse);

  if (!query.success) {
    throw createError({ data: query.error.format() });
  }
  const { createReport } = fetchPostsApi();

  const response = await createReport(query.data);

  if (!response) {
    throw createError({ statusCode: 404 });
  }
  return response;
});
