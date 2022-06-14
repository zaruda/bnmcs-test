import type { NextApiRequest, NextApiResponse } from "next";

import { Products } from "@database";

import { IProduct } from "@src/types/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct | IProduct[]>
) {
  if (req.method === "POST") {
    const product = await Products.create(JSON.parse(req.body));

    return res.status(201).json(product);
  }

  const data = await Products.getAll();

  return res.status(200).json(data);
}
