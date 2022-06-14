import { object, string, number, mixed, array, ref } from "yup";

import { IDropdownOption, IntermediaryType } from "@src/types/Intermediary";

const nameField = "name";
const orderField = "order";
const typeField = "type";
const rangeOptionsField = "rangeOptions";
const rangeOptionsFromField = "from";
const rangeOptionsToField = "to";
const rangeOptionsStepField = "step";
const dropdownOptionsField = "dropdownOptions";
const dropdownOptionNameField = "option";
const dropdownOptionValueField = "value";

export const intermediaryFormFields = {
  nameField,
  orderField,
  typeField,
  rangeOptionsField,
  rangeOptionsFromField,
  rangeOptionsToField,
  rangeOptionsStepField,
  dropdownOptionsField,
  dropdownOptionNameField,
  dropdownOptionValueField,
};
