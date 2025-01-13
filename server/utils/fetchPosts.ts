export const fetchPostsApi = () => {
	const { apiUrl } = useAppConfig();

	const getWpDetectCheck = async (url: string, host: string | undefined) => {
		return await $fetch(`${apiUrl}api/v1/urls`, {
			method: 'POST',
			body: {
				url,
				host
			},
		});
	};

	return {
		getWpDetectCheck,
	};
};
