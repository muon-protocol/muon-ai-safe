import axios, { Axios } from "axios";
import { ActionResponse, IMuonSafeClient } from "./interfaces/MuonSafeClient";

export class MuonSafeClient implements IMuonSafeClient {
  public axiosClient: Axios | null = null;

  constructor(
    private agentAddress: string,
    private appName: string,
    private executorUrl = "https://ai-safe-api.muon.net/"
  ) {
    this.axiosClient = axios.create({
      baseURL: this.executorUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async performAction<T>(
    action: string,
    parameters: any,
    agentSign: string
  ): Promise<ActionResponse> {
    if (!this.axiosClient) {
      throw new Error("Client is not initialized");
    }

    const result = await this.axiosClient.post<T>("/execute", {
      module: "agent-actions",
      params: {
        action,
        params: parameters,
        app: this.appName
      },
      agent: this.agentAddress,
      agentSign,
    });

    return result.data as ActionResponse;
  }
}

export default {
  MuonSafeClient,
};
