// Load only user favourite movies

import prismadb from "../../../lib/prismadb.tsx";
import serverAuth from "../../../lib/serverAuth.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    // const favoritedVideos = await prismadb.movie.findMany({
    //   where: {
    //     id: {
    //       in: currentUser?.favoriteIds,
    //     },
    //   },
    // });

    const favoritedVideos = await currentUser.favoriteIds;

    return res.status(200).json(favoritedVideos);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
