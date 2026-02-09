import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // "max-params": ["error", 2],
      // "func-style": ["error", "expression"],
      // "react/function-component-definition": [
      //   "error",
      //   {
      //     namedComponents: "arrow-function",
      //     unnamedComponents: "arrow-function",
      //   },
      // ],
    },
  },
]);

export default eslintConfig;
