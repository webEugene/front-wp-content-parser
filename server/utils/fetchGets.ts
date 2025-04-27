import type { ReportType } from "~/types/ReportType";

export const fetchGetsApi = () => {
  const { apiUrl } = useAppConfig();

  const getAllReports = async (): Promise<ReportType> => {
    return await $fetch(`${apiUrl}reports/all-reports`);
  };

  return {
    getAllReports,
  };
};
