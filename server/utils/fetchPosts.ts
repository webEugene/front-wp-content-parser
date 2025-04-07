export const fetchPostsApi = () => {
  const { apiUrl } = useAppConfig();

  const getWpDetectCheck = async (url: string, host: string | undefined) => {
    return await $fetch(`${apiUrl}api/v1/urls/wp-check`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  const getSitemapDetectCheck = async (
    url: string,
    host: string | undefined,
  ) => {
    return await $fetch(`${apiUrl}api/v1/urls/sitemap-check`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  const getExtractedSitemapList = async (
    url: string,
    host: string | undefined,
  ) => {
    return await $fetch(`${apiUrl}api/v1/urls/sitemap-extract`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  const getGrabbedLinks = async (url: string, host: string | undefined) => {
    return await $fetch(`${apiUrl}api/v1/urls/grab-links`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  interface ICreateReport {
    pageName: string;
    email?: string | null;
    report: string;
  }

  const createReport = async (data: ICreateReport) => {
    const { pageName, email, report } = data;
    return await $fetch(`${apiUrl}api/v1/reports/create-report`, {
      method: "POST",
      body: {
        pageName,
        email,
        report,
      },
    });
  };

  return {
    getWpDetectCheck,
    getSitemapDetectCheck,
    getExtractedSitemapList,
    getGrabbedLinks,
    createReport,
  };
};
