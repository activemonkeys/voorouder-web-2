// apps/web/proxy.ts
import {NextResponse, type NextRequest} from 'next/server';
import {redirects} from '@/config/redirects';
import {apiAuthMiddleware} from '@/lib/api-auth';
import {rateLimitMiddleware} from '@/lib/rate-limit';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // API routes controle
  if (path.startsWith('/api/data')) {
    const authResult = apiAuthMiddleware(request);
    if (authResult.status !== 200) {
      return authResult;
    }
    return rateLimitMiddleware(request);
  }

  // Redirects
  const redirectPath = redirects[path];
  if (redirectPath) {
    const url = new URL(redirectPath, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, {
      status: 308,
    });
  }

  return NextResponse.next();
}
