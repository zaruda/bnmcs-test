import { IService } from "@src/types/Service";

class BaseService<T extends object> implements IService<T> {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<U>(url: string): Promise<U> {
    const response = await fetch(`${this.baseUrl}${url}`)
      .then((response) => response.json())
      .then((data): U => data);

    return response;
  }

  public async post(url: string, body: T): Promise<T> {
    return await fetch(`${this.baseUrl}${url}`, {
      body: JSON.stringify(body),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data): T => data);
  }

  public async put(url: string, body: T): Promise<T> {
    return await fetch(`${this.baseUrl}${url}`, {
      body: JSON.stringify(body),
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data): T => data);
  }

  public async delete(url: string): Promise<T> {
    return await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    }).then((response) => response.json());
  }
}

export default BaseService;
