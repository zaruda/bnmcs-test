import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Product from "./Product";

import { IProductListProps } from "./types";

const ProductList: FC<IProductListProps> = ({ products, onItemRemoved }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <Product product={p} onRemoved={onItemRemoved} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductList;
