export interface IRepository<T extends object> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T | undefined>;
  delete(id: string): Promise<T | undefined>;
}
