import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "You must be signed in to delete a post" });

    const id = req.body.id;
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
    });
    try {
      const result = await prisma.note.delete({
        where: {
          id,
        },
      });
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
