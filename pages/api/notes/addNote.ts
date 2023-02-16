import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "you must be signed in to make a note" });

    const title: string = req.body.title;

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!title.length)
      return res.status(401).json({ message: "your note cant be empty." });
    try {
      const result = await prisma.note.create({
        data: {
          title,
          userId: prismaUser?.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(401).send(error);
    }
  }
}
