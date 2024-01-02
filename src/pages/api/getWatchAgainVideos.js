import serverAuth from "../../../lib/serverAuth.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const watchedVideos = await currentUser.watchAgainIds;

    return res.status(200).json(watchedVideos);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
