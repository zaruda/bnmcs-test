import type { NextPage } from "next";
import Link from "next/link";

import { Container, Button } from "@mui/material";

import links from "@src/resources/links";

import { useProducts } from "../hooks/useProducts";
import ProductList from "./components/ProductList";

const ProductsPage: NextPage = () => {
  const { data: products = [], refetch } = useProducts();

  return (
    <Container>
      <Link href={links.index} passHref>
        <Button>Home</Button>
      </Link>
      <Link href={links.products.create} passHref>
        <Button color="primary" variant="contained">
          New
        </Button>
      </Link>
      <ProductList products={products} onItemRemoved={refetch} />
    </Container>
  );
};

export default ProductsPage;
