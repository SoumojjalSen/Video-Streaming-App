import { getServerSession } from "next-auth";
import prismadb from "../lib/prismadb.tsx";
import { authOptions } from "../src/pages/api/auth/[...nextauth].tsx";

// We can use serverAuth in every API routes to check whether we are logged in
const serverAuth = async (req, res) => {
  
  // The req is going to hold the JWT tokens
  const session = await getServerSession(req, res, authOptions); 

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
