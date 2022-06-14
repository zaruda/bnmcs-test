import type { NextApiRequest, NextApiResponse } from "next";

import { Intermediaries } from "@database";

import { IIntermediary } from "@src/types/Intermediary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IIntermediary | IIntermediary[]>
) {
  const intermediaryId = req.query.intermediaryId as string;

  if (req.method === "DELETE") {
    const deleted = await Intermediaries.delete(intermediaryId);

    if (deleted) {
      return res.status(200).json(deleted);
    }
  }

  if (req.method === "PUT") {
    const updated = await Intermediaries.update(
      intermediaryId,
      JSON.parse(req.body)
    );

    if (updated) {
      return res.status(201).json(updated);
    }
  }

  const intermediary = await Intermediaries.getById(intermediaryId);

  if (!intermediary) {
    return res.status(404);
  }

  return res.status(200).json(intermediary);
}
