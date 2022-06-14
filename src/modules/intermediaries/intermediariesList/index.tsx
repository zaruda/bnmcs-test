import type { NextPage } from "next";
import Link from "next/link";

import { Container, Button } from "@mui/material";

import links from "@src/resources/links";

import { useIntermediaries } from "../hooks/useIntermediaries";
import IntermediaryList from "./components/IntermediaryList";
import { intermediariesSorterByOrder } from "./utils";

const IntermediariesListPage: NextPage = () => {
  const { data: intermediaries = [], refetch } = useIntermediaries();

  const orderedIntermediaries = intermediariesSorterByOrder(intermediaries);

  return (
    <Container>
      <Link href={links.index} passHref>
        <Button>Home</Button>
      </Link>
      <Link href={links.intermediaries.create} passHref>
        <Button color="primary" variant="contained">
          New
        </Button>
      </Link>
      <IntermediaryList
        intermediaries={orderedIntermediaries}
        onItemRemoved={refetch}
      />
    </Container>
  );
};

export default IntermediariesListPage;
