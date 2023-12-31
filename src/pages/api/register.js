import bcrypt from "bcrypt";

import prismadb from "../../../lib/prismadb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    
    const { email, name, password } = req.body;
    
    if (!email){
      return res.status(422).json({ error: "Enter an email id !" });
    }
    if (!name){
      return res.status(422).json({ error: "Enter username !" });
    }
    if (!password){
      return res.status(422).json({ error: "Enter a password !" });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        emailVerified: new Date(),
        favoriteIds: [],
        watchAgainIds: [],
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
