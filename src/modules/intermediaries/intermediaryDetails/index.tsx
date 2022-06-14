import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, CircularProgress, Container, Typography } from "@mui/material";

import links from "@src/resources/links";
import type { IDropdownOption } from "@src/types/Intermediary";

import { useIntermediary } from "../hooks/useIntermediary";

interface IProps {
  intermediaryId: string;
}

const IntermediaryDetailsPage: NextPage<IProps> = ({ intermediaryId }) => {
  const router = useRouter();
  const { data: intermediary, isLoading } = useIntermediary(intermediaryId);

  const renderDropdownOption = (
    dropdownOption: IDropdownOption,
    index: number
  ) => (
    <div key={`${dropdownOption.option}${index}`}>
      <Typography>Name: {dropdownOption.option}</Typography>
      <Typography>Value: {dropdownOption.value}</Typography>
    </div>
  );

  const handleBack = () => router.back();

  // TODO: Fetch data during SSR to save app from hell of spinners
  if (isLoading) {
    <CircularProgress />;
  }

  return (
    <Container>
      <Button onClick={handleBack}>Back</Button>
      {intermediary && (
        <Link href={links.intermediaries.edit(intermediary.id)} passHref>
          <Button>Edit</Button>
        </Link>
      )}

      <Typography>Name: {intermediary?.name}</Typography>
      <Typography>Order: {intermediary?.order}</Typography>
      <Typography>Type: {intermediary?.type}</Typography>
      {intermediary?.dropdownOptions?.length && (
        <div>
          <Typography>Dropdown options</Typography>
          {intermediary?.dropdownOptions.map(renderDropdownOption)}
        </div>
      )}
      {intermediary?.rangeOptions && (
        <div>
          <Typography>Range options:</Typography>
          <Typography>Range from: {intermediary?.rangeOptions.from}</Typography>
          <Typography>Range to: {intermediary?.rangeOptions.to}</Typography>
          <Typography>Range step: {intermediary?.rangeOptions.step}</Typography>
        </div>
      )}
      {intermediary?.createdAt && (
        <Typography>
          Created at: {new Date(intermediary.createdAt).toLocaleDateString()}
        </Typography>
      )}
    </Container>
  );
};

IntermediaryDetailsPage.getInitialProps = (ctx) => {
  return {
    intermediaryId: ctx.query.intermediaryId as string,
  };
};

export default IntermediaryDetailsPage;
