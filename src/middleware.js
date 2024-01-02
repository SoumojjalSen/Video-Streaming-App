import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  // Given incoming request /homedb
  // let response = NextResponse.next();
  
  let isLoggedIn = request.cookies.get("next-auth.session-token");
  console.log("ius loggeddd in: ", isLoggedIn);

  if (isLoggedIn) {
    console.log("Namaste loggged in")
    return NextResponse.next();
  }
  else {
    console.log("NOooooooooooooo");
    return NextResponse.redirect(new URL("/loginForm", request.nextUrl));
  }


}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ["/video/:path*", "/", "/browse/:path*"],
};
