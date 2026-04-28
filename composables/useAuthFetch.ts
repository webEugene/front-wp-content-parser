export const useAuthFetch = async (url: string, options: any = {}) => {
  const config = useRuntimeConfig();
  const { getToken } = useAuth();
  const token = await getToken.value();

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    baseURL: `${config.public.apiURL}`,
  });
};
