import { FC } from "react";
import { getIn } from "formik";

import { TextField } from "@mui/material";

import { IInputTextProps } from "./types";

const InputText: FC<IInputTextProps> = ({
  field,
  form: { errors, touched },
  label,
  type,
}) => {
  const hasFieldErrors = getIn(errors, field.name);
  const isFieldTouched = getIn(touched, field.name);

  return (
    <TextField
      fullWidth
      {...field}
      id={field.name}
      label={label}
      type={type}
      error={isFieldTouched && Boolean(hasFieldErrors)}
      helperText={isFieldTouched && hasFieldErrors}
    />
  );
};

export default InputText;
