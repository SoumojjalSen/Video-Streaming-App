import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(request, response) {
  
  // let isLoggedIn = request.cookies.get("next-auth.session-token");
  // console.log("ius loggeddd in: ", isLoggedIn);

  // const { currentUser } = await serverAuth(req, res);

  const session = getSession(request);
  console.log("the session is :::" , session);

  if (session) {
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
