// eslint.config.mjs
import {config as reactInternalConfig} from '@workspace/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  // Gebruik de config voor interne React-packages.
  ...reactInternalConfig,

  // Voeg een expliciet 'ignores' blok toe voor deze package.
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
];
