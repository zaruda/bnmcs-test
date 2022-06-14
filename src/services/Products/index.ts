import BaseService from "../BaseService";

import { IProduct } from "@src/types/Product";

class ProductsService extends BaseService<IProduct> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async getProducts() {
    return await this.get<IProduct[]>("/products");
  }

  public async getProductById(productId: string) {
    return await this.get<IProduct>(`/products/${productId}`);
  }

  public async deleteProductById(intermediaryId: string) {
    return await this.delete(`/products/${intermediaryId}`);
  }
}

export default ProductsService;
