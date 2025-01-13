export const fetchAnalyticsApi = () => {
    const { apiUrl } = useAppConfig();

    const getAnalyticsApi = async () => {
        return await $fetch(`${apiUrl}api/v1/analytics`);
    };

    return {
        getAnalyticsApi,
    };
};
