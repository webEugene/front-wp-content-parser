import { fetchGetsApi } from "~/server/utils/fetchGets";
import { createdReportSchema } from "~/server/schemas/reportSchema";
import type { ReportItemsType } from "~/types/ReportType";

export default defineEventHandler(async (): Promise<ReportItemsType> => {
  const { getAllReports } = fetchGetsApi();

  const response = await getAllReports();
  // return response;
  const parsed = createdReportSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({ data: parsed.error.format() });
  }
  return {
    items: parsed.data,
  };
});
