import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path: '/',
    })
    let cookie = request.cookies.get('token')
    console.log("cookie:", cookie)

    cookie = response.cookies.get('vercel')
    console.log(cookie)

    const allCookies = request.cookies.getAll()
    console.log("All cookie:", allCookies)
    if (request.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/about-2', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    }
}