import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  ...eslintPluginVue.configs["flat/recommended"],
  {
    files: ["layouts/*.vue", "pages/**/*.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
  {
    rules: {
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: false,
        },
      ],
    },
  },
  {
    files: ["layouts/default.vue"],
    rules: { "vue/component-name-in-template-casing": "off" },
  },
  {
    files: ["types/*.d.ts"],
    rules: { "no-var": "off" },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
);
