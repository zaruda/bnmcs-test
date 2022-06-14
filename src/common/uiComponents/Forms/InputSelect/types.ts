import { FieldProps } from "formik";
import { TextFieldProps } from "@mui/material/TextField";

export type IInputSelectOption = {
  value: number | string;
  label: string;
};

export type IInputSelectProps = TextFieldProps &
  FieldProps & {
    options: IInputSelectOption[];
  };
