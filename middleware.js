// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
    const host = request.headers.get('host')?.split(':')[0] || 'default'
    const res = NextResponse.next()
    res.cookies.set('site-host', host, { path: '/' })
    return res
}
