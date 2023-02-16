import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.note.findUnique({
        where: {
          id: req.query.id,
        },
        include: {
          user: true,
        },
      });
      res.status(200).send(data);
    } catch (error) {
      res.status(404).json({ message: "no post with that ID" });
    }
  }
}
