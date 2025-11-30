import type { ReportType } from "~/types/ReportType";

export const fetchGetsApi = () => {
  const config = useRuntimeConfig();

  const getAllReports = async (): Promise<ReportType> => {
    return await $fetch(`${config.public.apiURL}reports/all-reports`);
  };

  return {
    getAllReports,
  };
};
