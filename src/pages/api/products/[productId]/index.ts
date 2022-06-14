import type { NextApiRequest, NextApiResponse } from "next";

import { Products } from "@database";

import { IProduct } from "@src/types/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct | IProduct[]>
) {
  const productId = req.query.productId as string;

  if (req.method === "DELETE") {
    const deleted = await Products.delete(productId);

    if (deleted) {
      return res.status(200).json(deleted);
    }
  }

  if (req.method === "PUT") {
    const updated = await Products.update(productId, JSON.parse(req.body));

    if (updated) {
      return res.status(201).json(updated);
    }
  }

  const product = await Products.getById(productId);

  if (!product) {
    return res.status(404);
  }

  return res.status(200).json(product);
}
