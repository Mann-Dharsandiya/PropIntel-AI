 export interface AdvisorRequest {
  message: string;
}

export interface AdvisorResponse {
  success: boolean;
  tool: string;
  answer: string;
  data: unknown;
}