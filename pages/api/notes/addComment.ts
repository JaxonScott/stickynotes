import prisma from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please sign in to make comments." });
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (req.method === "POST") {
    const { comment, noteId } = req.body.data;

    if (!comment.length)
      return res.status(401).json({ message: "Your comment cant be empty." });
    try {
      const result = await prisma.comment.create({
        data: {
          comment,
          userId: prismaUser.id,
          noteId,
        },
      });
      res.status(200).send(result);
    } catch (error) {
      res.status(401).send(error);
    }
  }
}
