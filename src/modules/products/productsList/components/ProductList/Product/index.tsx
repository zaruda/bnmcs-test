import { FC } from "react";
import Link from "next/link";

import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

import links from "@src/resources/links";
import services from "@src/services";

import { IProductProps } from "./types";

const Product: FC<IProductProps> = ({ product, onRemoved }) => {
  const handleDelete = async () => {
    try {
      await services.products.deleteProductById(product.id);

      onRemoved();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableCell align="right">{product.name}</TableCell>
      <TableCell align="right">{product.manufacturerCost}</TableCell>
      <TableCell align="right">
        <Link href={links.products.details(product.id)} passHref>
          <Button>Details</Button>
        </Link>
        <Link href={links.products.edit(product.id)} passHref>
          <Button>Edit</Button>
        </Link>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </TableCell>
    </>
  );
};

export default Product;
