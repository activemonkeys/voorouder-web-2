// apps/web/lib/rate-limit.ts
import {NextRequest, NextResponse} from 'next/server';

import {serverEnv as env} from '@workspace/env';

// Eenvoudige in-memory rate limiter
// In productie zou je Redis of een andere externe cache gebruiken
const ipRequestsMap = new Map<string, {count: number; resetTime: number}>();

const RATE_LIMIT_REQUESTS = env.API_MAX_REQUESTS_PER_MINUTE;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuut

export function rateLimitMiddleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  const ipData = ipRequestsMap.get(ip) || {
    count: 0,
    resetTime: now + RATE_LIMIT_WINDOW_MS,
  };

  if (now > ipData.resetTime) {
    ipData.count = 0;
    ipData.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  ipData.count++;
  ipRequestsMap.set(ip, ipData);

  if (ipData.count > RATE_LIMIT_REQUESTS) {
    return NextResponse.json(
      {
        success: false,
        error: 'Te veel verzoeken. Probeer het later opnieuw.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': `${Math.ceil((ipData.resetTime - now) / 1000)}`,
        },
      },
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_REQUESTS));
  response.headers.set(
    'X-RateLimit-Remaining',
    String(RATE_LIMIT_REQUESTS - ipData.count),
  );
  response.headers.set(
    'X-RateLimit-Reset',
    String(Math.ceil(ipData.resetTime / 1000)),
  );

  return response;
}
