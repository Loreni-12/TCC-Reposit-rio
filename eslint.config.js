import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "coverage", ".firebase"]),
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    // Arquitetura: só services/ e lib/ conversam com o Firebase.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/services/**", "src/lib/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["firebase", "firebase/*", "@firebase/*", "**/lib/firebase"],
              message: "Acesse o Firebase somente por src/services/ (fluxo pages → components → features → services).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["*.{js,ts}", "tests/**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },
]);
