/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {    

  const refererSite = request.headers.get("Referer")  
  const httpRefrers = process.env.NEXT_PUBLIC_HTTP_BLOCK_REFERER  
  const shouldBlock = httpRefrers
    ?.split(',')
    .filter((referer) =>
      refererSite
        ?.toLowerCase()
        .trim()
        .includes(referer.toLowerCase().trim())
    )

  if (shouldBlock?.length) {
    console.log(
      `INFO INFO: Blocked the request Because the referrer matches the pattern='${shouldBlock}'`
    )
     
    const res = new NextResponse(null, { status: 403 })
    res.headers.set("x-middleware-refresh", "1")
    return res
  }

} 
