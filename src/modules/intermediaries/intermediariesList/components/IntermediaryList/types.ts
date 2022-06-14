import { IIntermediary } from "@src/types/Intermediary";

export interface IIntermediaryListProps {
  intermediaries: IIntermediary[];
  onItemRemoved(): void;
}
