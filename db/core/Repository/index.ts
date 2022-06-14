import fs from "fs/promises";
import { v4 as uuid } from "uuid";

import { IRepository } from "./types";

class Repository<T extends { id: string }> implements IRepository<T> {
  private readonly databasePath: string;
  private database: T[];

  constructor(databasePath: string, database: any) {
    this.databasePath = databasePath;
    this.database = database;
  }

  public async getAll(): Promise<T[]> {
    return this.database;
  }

  public async getById(id: string): Promise<T | undefined> {
    return this.database.find((el) => el.id === id);
  }

  public async create(data: T): Promise<T> {
    const newData = { ...data, id: uuid() };

    this.database.push(newData);

    await this.saveData();

    return newData;
  }

  public async update(id: string, data: T): Promise<T | undefined> {
    const exisingData = await this.getById(id);

    if (exisingData) {
      const updatedItem = Object.assign(exisingData, data);

      await this.saveData();

      return updatedItem;
    }
  }

  public async delete(id: string): Promise<T | undefined> {
    const itemToDelete = await this.getById(id);

    if (itemToDelete) {
      this.database = this.database.filter((el) => el.id !== id);

      await this.saveData();
    }

    return itemToDelete;
  }

  private async saveData() {
    return await fs.writeFile(
      this.databasePath,
      JSON.stringify(this.database, null, 4),
      "utf-8"
    );
  }
}

export default Repository;
