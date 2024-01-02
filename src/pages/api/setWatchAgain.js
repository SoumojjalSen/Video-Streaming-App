import { without } from "lodash";
import prismadb from "../../../lib/prismadb.tsx";
import serverAuth from "../../../lib/serverAuth.js"; // To check whether the user is logged in or not

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      console.log("Wow not logging in", currentUser);

      const { videoId } = req.body;

      const temp = without(currentUser.watchAgainIds, videoId);
      temp.unshift(videoId);
      const updatedWatchAgainIds = temp;

      console.log("Updated video ids ::: adfvas", {updatedWatchAgainIds});

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          watchAgainIds: updatedWatchAgainIds,
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
