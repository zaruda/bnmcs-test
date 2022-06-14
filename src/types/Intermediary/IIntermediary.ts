import { IDropdownOption } from "./IDropdownOption";
import { IntermediaryType } from "./IntermediaryType";
import { IRangeOption } from "./IRangeOption";

export interface IIntermediary {
  id: string;
  name: string;
  createdAt: string;
  order: number;
  type: IntermediaryType;
  rangeOptions?: IRangeOption;
  dropdownOptions?: IDropdownOption[];
}
