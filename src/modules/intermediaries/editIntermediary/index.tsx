import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Container, Button, CircularProgress } from "@mui/material";

import { useIntermediary } from "../hooks/useIntermediary";
import EditIntermediaryForm from "./components/EditIntermediaryForm";

interface IProps {
  intermediaryId: string;
}

const EditIntermediary: NextPage<IProps> = ({ intermediaryId }) => {
  const router = useRouter();
  const { data: intermediary, isLoading } = useIntermediary(intermediaryId);

  const handleBack = () => router.back();

  if (isLoading) {
    <CircularProgress />;
  }

  return (
    <Container>
      <Button onClick={handleBack} color="primary" variant="contained">
        Back
      </Button>

      {/* TODO: could be handled more gracefully */}
      {intermediary && (
        <EditIntermediaryForm
          intermediary={intermediary}
          onIntermediaryUpdated={() => router.back()}
        />
      )}
    </Container>
  );
};

EditIntermediary.getInitialProps = (ctx) => {
  return {
    intermediaryId: ctx.query.intermediaryId as string,
  };
};

export default EditIntermediary;
