import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: id?.toString(),
        },
        include: {
          notes: true,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(401).json({ message: "there is no user with this ID." });
    }
  }
}
