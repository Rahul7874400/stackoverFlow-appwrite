import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDB from './model/server/dbSetup'
import getOrCreateBucket from './model/server/storageSetup'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    Promise.all([
        getOrCreateDB(),
        getOrCreateBucket()
    ])
return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    /*
    math all the request path expect for the one which start with:
    - api
    - _next/static
    - _next/image
    - favicon.com
    */
    
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)" ]
}