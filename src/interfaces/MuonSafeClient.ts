import { Axios } from "axios";

export interface ActionResponse {
  success: boolean,
  data?: {
    id: string
  },
  message?: string
}

export interface IMuonSafeClient {
  axiosClient: Axios | null;
  performAction(
    action: string,
    parameters: string,
    agentSign: string
  ): Promise<ActionResponse | Error>;
}
