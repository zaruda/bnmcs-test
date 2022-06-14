import { NextPage } from "next";
import Link from "next/link";

import { Button, Container } from "@mui/material";

import links from "@src/resources/links";

const Home: NextPage = () => {
  return (
    <Container>
      <Link href={links.intermediaries.index} passHref>
        <Button>Intermediaries</Button>
      </Link>
      <Link href={links.products.index} passHref>
        <Button>Products</Button>
      </Link>
    </Container>
  );
};

export default Home;
