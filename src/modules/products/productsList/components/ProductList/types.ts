import { IProduct } from "@src/types/Product";

export interface IProductListProps {
  products: IProduct[];
  onItemRemoved(): void;
}
