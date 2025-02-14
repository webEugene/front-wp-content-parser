export const fetchAnalyticsApi = () => {
	const { apiUrl } = useAppConfig();

	const getAnalyticsApi = async (filterData: { page: number }) => {
		const { page } = filterData;
		return await $fetch(`${apiUrl}api/v1/analytics/wp-check?page=${page}`);
	};

	const getSitemapTestsAnalyticsApi = async () => {
		return await $fetch(`${apiUrl}api/v1/analytics/sitemap-test`);
	};

	return {
		getAnalyticsApi,
		getSitemapTestsAnalyticsApi,
	};
};
