export const fetchPostsApi = () => {
	const { apiUrl } = useAppConfig();

	const getWpDetectCheck = async (url: string, host: string | undefined) => {
		return await $fetch(`${apiUrl}api/v1/urls/wp-check`, {
			method: 'POST',
			body: {
				url,
				host
			},
		});
	};

	const getSitemapDetectCheck = async (url: string, host: string | undefined) => {
		return await $fetch(`${apiUrl}api/v1/urls/sitemap-check`, {
			method: 'POST',
			body: {
				url,
				host
			},
		});
	};

	const getExtractedSitemapList = async (url: string, host: string | undefined) => {
		return await $fetch(`${apiUrl}api/v1/urls/sitemap-extract`, {
			method: 'POST',
			body: {
				url,
				host
			},
		});
	};

	return {
		getWpDetectCheck,
		getSitemapDetectCheck,
		getExtractedSitemapList
	};
};
