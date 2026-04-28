export const fetchClientApi = () => {
  const config = useRuntimeConfig();

  const getClientWpCheck = async (url: string) => {
    return await $fetch(`${config.public.apiURL}urls/client-wp-check`, {
      method: "POST",
      body: {
        url,
      },
    });
  };

  return {
    getClientWpCheck,
  };
};
