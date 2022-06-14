import { IIntermediary } from "@src/types/Intermediary";

export interface IIntermediaryProps {
  intermediary: IIntermediary;
  onRemoved(): void;
}
