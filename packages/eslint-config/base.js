import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**'],
  },

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',

      // 1. Zet de standaard variabele checks UIT (geen gezeur over _vars of normale vars)
      '@typescript-eslint/no-unused-vars': 'off',

      // 2. Zet de plugin variabele check ook UIT
      'unused-imports/no-unused-vars': 'off',

      // 3. Zet ALLEEN de check op ongebruikte IMPORTS aan (Error zodat --fix werkt)
      'unused-imports/no-unused-imports': 'error',
    },
  },
];
