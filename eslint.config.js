// @ts-check

import "eslint-plugin-only-warn";

import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import typeScriptEslint, { } from "typescript-eslint";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default typeScriptEslint.config(
    eslint.configs.recommended,
    stylistic.configs["disable-legacy"], // Disable legacy eslint-proper rules.
    ...typeScriptEslint.configs.recommendedTypeChecked,
    stylistic.configs["recommended-flat"],

    // @ts-expect-error Bad typings from stylistic.
    stylistic.configs.customize({
        quotes: "double",
        commaDangle: "only-multiline",
        semi: true,
        indent: 4,
        arrowParens: false
    }),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactRecommended,
        ...reactJsxRuntime, // Ignore react-in-jsx-scope warnings.
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "default-case": "warn",
            "require-await": "warn",
            "@stylistic/arrow-parens": "off", // No idea why customize isn't customizing this one...
            "@stylistic/jsx-one-expression-per-line": "off", // This one is just annoying...
            "@stylistic/jsx-closing-bracket-location": "off", // This one is just annoying...
        }
    },
);
