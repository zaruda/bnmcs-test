import type { NextApiRequest, NextApiResponse } from "next";

import { Intermediaries } from "@database";

import { IIntermediary } from "@src/types/Intermediary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IIntermediary | IIntermediary[]>
) {
  if (req.method === "POST") {
    const intermediary = await Intermediaries.create(JSON.parse(req.body));

    return res.status(201).json(intermediary);
  }

  const data = await Intermediaries.getAll();

  return res.status(200).json(data);
}
