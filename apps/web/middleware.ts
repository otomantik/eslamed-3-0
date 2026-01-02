import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Redirect non-www to www (301 permanent redirect)
  if (hostname === 'eslamed.com' || hostname.startsWith('eslamed.com:')) {
    url.host = 'www.eslamed.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Ensure HTTPS (if not already)
  if (url.protocol === 'http:' && !hostname.includes('localhost')) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)',
  ],
};

