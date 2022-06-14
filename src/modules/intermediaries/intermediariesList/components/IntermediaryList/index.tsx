import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Intermediary from "./Intermediary";
import { IIntermediaryListProps } from "./types";

const IntermediaryList: FC<IIntermediaryListProps> = ({
  intermediaries,
  onItemRemoved,
}) => (
  // TODO: Table component can be moved to common ui components
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Created at</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Order</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {intermediaries.map((ird) => (
          <TableRow key={ird.id}>
            <Intermediary intermediary={ird} onRemoved={onItemRemoved} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default IntermediaryList;
