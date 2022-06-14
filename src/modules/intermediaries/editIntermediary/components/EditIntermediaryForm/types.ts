import { IIntermediary } from "@src/types/Intermediary";

export interface IEditIntermediaryFormProps {
  intermediary: IIntermediary;
  onIntermediaryUpdated(): void;
}
