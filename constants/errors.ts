export const ERROR_MESSAGES = {
  SERVER_ERROR:
    "Something went wrong. Please check your internet connection or try again later.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  UNKNOWN: "Something went wrong!",
  INVALID_URL: "Please enter a valid URL.",
  BLOCKED_ACCESS: "Access to the website was blocked.",
  SITE_OFFLINE: "The website appears to be offline.",
} as const;

export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: "Bad request. Please check your input.",
  401: "Unauthorized access.",
  403: "Access forbidden.",
  404: "Resource not found.",
  429: "Too many requests. Please try again later.",
  500: "Internal server error.",
  502: "Bad gateway.",
  503: "Service unavailable.",
  504: "Gateway timeout.",
} as const;

/**
 * Get error message by HTTP status code
 * @param statusCode - HTTP status code
 * @returns Error message or generic error if status code not found
 */
export const getErrorMessageByStatus = (statusCode: number): string => {
  return HTTP_STATUS_MESSAGES[statusCode] || ERROR_MESSAGES.UNKNOWN;
};
