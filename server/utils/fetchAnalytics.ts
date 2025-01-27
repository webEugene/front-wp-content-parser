export const fetchAnalyticsApi = () => {
    const { apiUrl } = useAppConfig();

    const getAnalyticsApi = async () => {
        return await $fetch(`${apiUrl}api/v1/analytics/wp-check`);
    };

    const getSitemapTestsAnalyticsApi = async () => {
        return await $fetch(`${apiUrl}api/v1/analytics/sitemap-test`);
    };

    return {
        getAnalyticsApi,
        getSitemapTestsAnalyticsApi
    };
};
