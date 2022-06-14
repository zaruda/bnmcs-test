import path from "path";
import Repository from "../core/Repository";
import { IProduct } from "@src/types/Product";

const repositoryPath = path.resolve(
  process.cwd(),
  "db",
  "data",
  "products.json"
);
const repositoryModule = require("../data/products.json");

const repository = new Repository<IProduct>(repositoryPath, repositoryModule);

export default repository;
