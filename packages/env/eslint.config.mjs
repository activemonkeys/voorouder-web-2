// eslint.config.mjs
import {config as baseConfig} from '@workspace/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  // Start met de gedeelde basisconfiguratie.
  ...baseConfig,

  // Voeg een expliciet 'ignores' blok toe voor deze package.
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
];
