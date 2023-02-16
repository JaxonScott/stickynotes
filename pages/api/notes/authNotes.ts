import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .send({ message: "You need an active session to access this route" });
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          notes: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(401).json({ message: "unable to find notes." });
    }
  }
}
