export const fetchAnalyticsApi = () => {
	const { apiUrl } = useAppConfig();

	const getAnalyticsApi = async (filterData: { page: string, limit: string }) => {
		const { page, limit } = filterData;
		return await $fetch(`${apiUrl}analytics/wp-check?limit=${limit}&page=${page}`);
	};

	const getSitemapTestsAnalyticsApi = async () => {
		return await $fetch(`${apiUrl}analytics/sitemap-test`);
	};

	return {
		getAnalyticsApi,
		getSitemapTestsAnalyticsApi,
	};
};
