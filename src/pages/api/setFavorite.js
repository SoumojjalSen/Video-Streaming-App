import { without } from "lodash";
import prismadb from "../../../lib/prismadb.tsx";
import serverAuth from "../../../lib/serverAuth.js"; // To check whether the user is logged in or not

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      console.log("Wow not logging in", currentUser);

      const { videoId } = req.body;

      // const existingVideo = await prismadb.video.findUnique({
      //   where: {
      //     id: videoId,
      //   },
      // });

      // if (!existingVideo) {
      //   throw new Error("Invalid ID");
      // }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: videoId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);

      const { videoId } = req.body;

      // const existingMovie = await prismadb.movie.findUnique({
      //   where: {
      //     id: movieId,
      //   },
      // });

      // if (!existingMovie) {
      //   throw new Error("Invalid ID");
      // }

      const updatedFavoriteIds = without(currentUser.favoriteIds, videoId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
