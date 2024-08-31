export interface SuccessResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
}
