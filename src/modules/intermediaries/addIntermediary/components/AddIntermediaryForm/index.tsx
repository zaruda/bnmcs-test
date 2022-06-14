import { FC } from "react";
import { useMutation } from "react-query";

import services from "@src/services";
import { IIntermediary, IntermediaryType } from "@src/types/Intermediary";
import { IntermediaryFormBase } from "@src/modules/intermediaries/components";
import { intermediaryFormFields } from "@src/modules/intermediaries/components/IntermediaryFormBase/constants";

import { IAddIntermediaryFormProps } from "./types";

const { typeField, dropdownOptionsField, rangeOptionsField } =
  intermediaryFormFields;

const AddIntermediaryForm: FC<IAddIntermediaryFormProps> = ({
  onIntermediaryCreated,
}) => {
  const { mutate: createIntermediary } = useMutation<
    IIntermediary,
    // TODO: replace with error response type
    Response,
    IIntermediary
  >(
    (intermediary) => services.intermediaries.createIntermediary(intermediary),
    {
      onSuccess: onIntermediaryCreated,
    }
  );

  // TODO: Create form values interface and use it for initial values constant. Then this
  // TS warning will be fixed
  const handleSubmit = async (values) => {
    const intermediary: IIntermediary = {
      ...values,
      createdAt: new Date().toISOString(),
      dropdownOptions:
        values[typeField] === IntermediaryType.Dropdown
          ? values[dropdownOptionsField]
          : null,
      rangeOptions:
        values[typeField] === IntermediaryType.Range
          ? values[rangeOptionsField]
          : null,
    };

    await createIntermediary(intermediary);
  };

  return <IntermediaryFormBase onSubmit={handleSubmit} />;
};

export default AddIntermediaryForm;
