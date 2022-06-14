import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Container, Button } from "@mui/material";

import links from "@src/resources/links";

import AddIntermediaryForm from "./components/AddIntermediaryForm";

const AddIntermediary: NextPage = () => {
  const router = useRouter();

  const handleBack = () => router.back();

  const onIntermediaryCreated = () =>
    router.replace(links.intermediaries.index);

  return (
    <Container>
      <Button onClick={handleBack} color="primary" variant="contained">
        Back
      </Button>

      <AddIntermediaryForm onIntermediaryCreated={onIntermediaryCreated} />
    </Container>
  );
};

export default AddIntermediary;
