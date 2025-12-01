// apps/web/lib/api-auth.ts
import {NextRequest, NextResponse} from 'next/server';

import {serverEnv as env} from '@workspace/env';

export function apiAuthMiddleware(request: NextRequest) {
  // Controleer of de authenticatie is uitgeschakeld
  if (env.API_AUTHORIZATION_ENABLED === 'false') {
    return NextResponse.next();
  }

  const apiKey = request.headers.get('x-api-key');

  // Als er geen API-key is opgegeven of deze komt niet overeen, retourneer 401 Unauthorized
  if (!apiKey || apiKey !== env.API_KEY_SECRET) {
    return NextResponse.json(
      {
        success: false,
        error: 'Ongeldige of ontbrekende API-key',
      },
      {status: 401},
    );
  }

  // Als de key geldig is, ga verder met de aanvraag
  return NextResponse.next();
}
