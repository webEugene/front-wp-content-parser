export const fetchAnalyticsApi = () => {
  const config = useRuntimeConfig();

  const getAnalyticsApi = async (filterData: {
    page: string;
    limit: string;
  }) => {
    const { page, limit } = filterData;
    return await $fetch(
      `${config.public.apiURL}analytics/wp-check?limit=${limit}&page=${page}`
    );
  };

  const getSitemapTestsAnalyticsApi = async () => {
    return await $fetch(`${config.public.apiURL}analytics/sitemap-test`);
  };

  return {
    getAnalyticsApi,
    getSitemapTestsAnalyticsApi,
  };
};
