import { useQuery } from "react-query";

import services from "@src/services";

export const useProducts = () =>
  useQuery("products", () => services.products.getProducts());
