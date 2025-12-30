import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "module",       // ESM
      globals: globals.node
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": ["error", { args: "none" }],
      "no-undef": "error"
    }
  },
]);
