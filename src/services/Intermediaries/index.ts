import BaseService from "../BaseService";

import { IIntermediary } from "@src/types/Intermediary";

class IntermediariesService extends BaseService<IIntermediary> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async createIntermediary(intermediary: IIntermediary) {
    return await this.post("/intermediaries", intermediary);
  }

  public async getIntermediaries() {
    return await this.get<IIntermediary[]>("/intermediaries");
  }

  public async getIntermediaryById(intermediaryId: string) {
    return await this.get<IIntermediary>(`/intermediaries/${intermediaryId}`);
  }

  public async updateIntermediary(
    intermediaryId: string,
    intermediary: IIntermediary
  ) {
    return await this.put(`/intermediaries/${intermediaryId}`, intermediary);
  }

  public async deleteIntermediaryById(intermediaryId: string) {
    return await this.delete(`/intermediaries/${intermediaryId}`);
  }
}

export default IntermediariesService;
