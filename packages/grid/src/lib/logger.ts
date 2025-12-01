// packages/grid/src/lib/logger.ts
// Dit is een nieuw bestand om @workspace/logging/client-logger te vervangen

type LogParams = Record<string, unknown>;

export function error(message: string, source: string, params?: LogParams) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${source}] ${message}`, params);
  }
}

export function warn(message: string, source: string, params?: LogParams) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[${source}] ${message}`, params);
  }
}

export function info(message: string, source: string, params?: LogParams) {
  if (process.env.NODE_ENV === 'development') {
    console.info(`[${source}] ${message}`, params);
  }
}
