export interface FrameworkDetail {
  icon: string;
  name: string;
  label: string;
}

export const FRAMEWORK_DETAILS: Readonly<FrameworkDetail[]> = [
  { icon: "material-icon-theme:nuxt", name: "Nuxt", label: "nuxt" },
  { icon: "material-icon-theme:react", name: "React", label: "react" },
  { icon: "material-icon-theme:next", name: "Next.js", label: "next" },
  { icon: "material-icon-theme:svelte", name: "Svelte", label: "svelte" },
  { icon: "material-icon-theme:vue", name: "Vue", label: "vue" },
  { icon: "material-icon-theme:angular", name: "Angular", label: "angular" },
  { icon: "skill-icons:wordpress", name: "WordPress", label: "wordpress" },
] as const;

/**
 * Get framework details by label
 * @param label - Framework label (e.g., "nuxt", "react")
 * @returns FrameworkDetail object or undefined if not found
 */
export const getFrameworkByLabel = (
  label: string,
): FrameworkDetail | undefined => {
  return FRAMEWORK_DETAILS.find((framework) => framework.label === label);
};

/**
 * Check if a label is a valid framework
 */
export const isValidFramework = (label: string): boolean => {
  return FRAMEWORK_DETAILS.some((framework) => framework.label === label);
};
