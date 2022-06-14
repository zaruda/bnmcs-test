import { IIntermediary } from "@src/types/Intermediary";

export interface IIntermediaryFormBaseProps {
  intermediary?: IIntermediary;
  onSubmit(values: Partial<IIntermediary>): void;
}
