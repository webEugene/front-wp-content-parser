import type { CreateReportType } from "~/types/ReportType";

export const fetchPostsApi = () => {
  const { apiUrl } = useAppConfig();

  const getWpDetectCheck = async (url: string, host: string | undefined) => {
    return await $fetch(`${apiUrl}urls/wp-check`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  const getSitemapFind = async (url: string, host: string | undefined) => {
    return await $fetch(`${apiUrl}urls/sitemap-check`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  const getExtractedSitemapList = async (
    url: string,
    host: string | undefined
  ) => {
    return await $fetch(`${apiUrl}urls/sitemap-extract`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  const getGrabbedLinks = async (url: string, host: string | undefined) => {
    return await $fetch(`${apiUrl}urls/grab-links`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  interface IParsingContentData {
    url: string;
    homeTitle?: string;
    homeContent?: string;
    pageTitle?: string;
    pageContent?: string;
    singleTitle?: string;
    singleContent?: string;
    archiveTitle?: string;
    archiveContent?: string;
    defaultTitle?: string;
    defaultContent?: string;
  }

  const createReport = async (data: CreateReportType) => {
    const { pageName, email, report } = data;

    // await $fetch(`${apiUrl}reports/create-report`, {
    //   method: "POST",
    //   body: {
    //     pageName,
    //     email,
    //     report,
    //   },
    // });

    try {
      const response = await $fetch(`${apiUrl}reports/create-report`, {
        method: "POST",
        body: { pageName, email, report },
      });
      return response;
    } catch (error: any) {
      console.log(error?.cause);

      throw new Error(
        `${error} :Something is wrong with your internet connection or the server is unreachable.`
      );
    }
  };

  const parseContent = async (
    data: IParsingContentData,
    host: string | undefined
  ) => {
    return await $fetch(`${apiUrl}parse/content`, {
      method: "POST",
      body: { ...data, host },
    });
  };

  const getWpClasses = async (url: string, host: string | undefined) => {
    return await $fetch(`${apiUrl}parse/classes`, {
      method: "POST",
      body: {
        url,
        host,
      },
    });
  };

  return {
    getWpDetectCheck,
    getSitemapFind,
    getExtractedSitemapList,
    getGrabbedLinks,
    createReport,
    parseContent,
    getWpClasses,
  };
};
