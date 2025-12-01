// apps/web/eslint.config.js
import {nextJsConfig} from '@workspace/eslint-config/next-js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: ['.next/**', '.turbo/**', 'dist/**', 'node_modules/**'],
  },
];
