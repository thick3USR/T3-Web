import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const subdomain = request.headers.get('host')?.split('.')[0] || ''

  requestHeaders.set('x-subdomain', subdomain)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
