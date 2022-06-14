import { FC } from "react";
import { useMutation } from "react-query";

import services from "@src/services";
import { IIntermediary, IntermediaryType } from "@src/types/Intermediary";
import { IntermediaryFormBase } from "@src/modules/intermediaries/components";
import { intermediaryFormFields } from "@src/modules/intermediaries/components/IntermediaryFormBase/constants";

import { IEditIntermediaryFormProps } from "./types";

const { typeField, dropdownOptionsField, rangeOptionsField } =
  intermediaryFormFields;

const EditIntermediaryForm: FC<IEditIntermediaryFormProps> = ({
  intermediary,
  onIntermediaryUpdated,
}) => {
  const { mutate: updateIntermediary } = useMutation<
    IIntermediary,
    // TODO: replace with error response type
    Response,
    IIntermediary
  >(
    (intermediary) =>
      services.intermediaries.updateIntermediary(intermediary.id, intermediary),
    {
      onSuccess: onIntermediaryUpdated,
    }
  );

  // TODO: Create form values interface and use it for initial values constant. Then this
  // TS warning will be fixed
  const handleSubmit = async (values) => {
    const updatedIntermediary: IIntermediary = {
      ...intermediary,
      ...values,
      dropdownOptions:
        values[typeField] === IntermediaryType.Dropdown
          ? values[dropdownOptionsField]
          : null,
      rangeOptions:
        values[typeField] === IntermediaryType.Range
          ? values[rangeOptionsField]
          : null,
    };

    await updateIntermediary(updatedIntermediary);
  };

  return (
    <IntermediaryFormBase intermediary={intermediary} onSubmit={handleSubmit} />
  );
};

export default EditIntermediaryForm;
