// Called in getCurrent user hook
// Api to check if the user is logged in and return thr current user

import serverAuth from "../../../lib/serverAuth.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser);

  } catch (error) {
    console.log(error);
    return res.status(500).end(); // Something went wrong
  }
}


