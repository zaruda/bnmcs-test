import { FC } from "react";
import Link from "next/link";

import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

import links from "@src/resources/links";
import services from "@src/services";

import { IIntermediaryProps } from "./types";

const Intermediary: FC<IIntermediaryProps> = ({ intermediary, onRemoved }) => {
  const handleDelete = async () => {
    try {
      await services.intermediaries.deleteIntermediaryById(intermediary.id);

      onRemoved();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableCell component="th" scope="row">
        {intermediary.createdAt}
      </TableCell>
      <TableCell align="right">{intermediary.name}</TableCell>
      <TableCell align="right">{intermediary.order}</TableCell>
      <TableCell align="right">
        <Link href={links.intermediaries.details(intermediary.id)} passHref>
          <Button>Details</Button>
        </Link>
        <Link href={links.intermediaries.edit(intermediary.id)} passHref>
          <Button>Edit</Button>
        </Link>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </TableCell>
    </>
  );
};

export default Intermediary;
