// packages/env/src/index.ts

/**
 * Dit bestand exporteert de reeds gevalideerde server- en client-omgevingsvariabelen.
 * Importeer expliciet `serverEnv` of `clientEnv`, afhankelijk van waar je de variabelen nodig hebt.
 * Dit voorkomt het per ongeluk lekken van server-variabelen naar de client.
 */
export {serverEnv, type ServerEnv} from './server';
export {clientEnv, type ClientEnv} from './client';
