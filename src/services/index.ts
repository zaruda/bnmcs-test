import IntermediariesService from "./Intermediaries";
import ProductsService from "./Products";

const BASE_URL = process.env.BASE_API_URL as string;

const services = {
  intermediaries: new IntermediariesService(BASE_URL),
  products: new ProductsService(BASE_URL),
};

export default services;
