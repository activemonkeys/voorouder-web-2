// eslint.config.mjs
import {config as reactInternalConfig} from '@workspace/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactInternalConfig,
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
];
