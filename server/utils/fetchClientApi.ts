import type { H3Event } from "h3";
import { getAuthToken } from "~~/server/utils/authCookie";

/**
 * Authorized calls to the backend "client" endpoints.
 * The token is taken from the httpOnly auth cookie of the incoming request.
 * Errors from $fetch are propagated to the caller (handlers map them).
 */
export const fetchClientApi = (event: H3Event) => {
  const config = useRuntimeConfig();
  const token = getAuthToken(event);

  const postWithAuth = (path: string, url: string): Promise<unknown> => {
    const endpoint: string = `${config.public.apiURL}wp-parser/urls/${path}`;
    return $fetch<unknown>(endpoint, {
      method: "POST",
      body: { url },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  };

  return {
    getClientWpCheck: (url: string) => postWithAuth("client-wp-check", url),
    getClientSitemapList: (url: string) =>
      postWithAuth("client-sitemap-list", url),
    getClientGrabbedLinks: (url: string) =>
      postWithAuth("client-grab-links", url),
  };
};
