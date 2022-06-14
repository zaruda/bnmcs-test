import { IProduct } from "@src/types/Product";

export interface IProductProps {
  product: IProduct;
  onRemoved(): void;
}
