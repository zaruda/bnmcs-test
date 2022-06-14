import { FC } from "react";
import { getIn } from "formik";

import { MenuItem, TextField } from "@mui/material";

import { IInputSelectProps, IInputSelectOption } from "./types";

const InputSelect: FC<IInputSelectProps> = ({
  field,
  form: { errors, touched },
  options,
  ...props
}) => {
  const hasFieldErrors = getIn(errors, field.name);
  const isFieldTouched = getIn(touched, field.name);

  const renderOption = (option: IInputSelectOption) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  );

  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      id={field.name}
      select
      error={isFieldTouched && Boolean(hasFieldErrors)}
      helperText={isFieldTouched && hasFieldErrors}
    >
      {options.map(renderOption)}
    </TextField>
  );
};

export default InputSelect;
