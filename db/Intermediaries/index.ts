import path from "path";
import Repository from "../core/Repository";
import { IIntermediary } from "@src/types/Intermediary";

const repositoryPath = path.resolve(
  process.cwd(),
  "db",
  "data",
  "intermediaries.json"
);
const repositoryModule = require("../data/intermediaries.json");

const repository = new Repository<IIntermediary>(
  repositoryPath,
  repositoryModule
);

export default repository;
