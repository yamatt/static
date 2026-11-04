import js from "@eslint/js";
import globals from "globals";
import svelte from "eslint-plugin-svelte";

export default [
  {
    ignores: ["dist/**"],
  },
  ...svelte.configs["flat/recommended"],
  {
    files: ["src/js/**/*.js", "src/**/*.svelte"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: js.configs.recommended.rules,
  },
];
