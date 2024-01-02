import { getServerSession } from "next-auth";
import prismadb from "../lib/prismadb.tsx";
import { authOptions } from "../src/pages/api/auth/[...nextauth].tsx";
import { getSession } from 'next-auth/react';

// We can use serverAuth in every API routes to check whether we are logged in
const serverAuth = async (req, res) => {
  // The order in which these parameters are provided when calling the function matters. When the function is called by the framework or server, it will pass the appropriate objects in the corresponding order.
  // The req is going to hold the JWT tokens
  const session = await getServerSession(req, res, authOptions); 
  // Will return session if request is from the server
  // const session = await getSession({req});

  // console.log("Hello requests" , req);
  // console.log("Hello sessions" , session);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
