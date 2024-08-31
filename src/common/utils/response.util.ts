import { SuccessResponse, ErrorResponse } from '@common/@types';

/**
 * Creates a SuccessResponse object.
 *
 * @param data The data to include in the response.
 * @param message The message to include in the response.
 * @param statusCode The HTTP status code to include in the response.
 * @returns A SuccessResponse object.
 */
export function createSuccessResponse<T>(
  data: T,
  message: string,
  statusCode: number,
): SuccessResponse<T> {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}

/**
 * Creates an ErrorResponse object.
 *
 * @param message The error message to include in the response.
 * @param statusCode The HTTP status code to include in the response.
 * @returns An ErrorResponse object.
 */
export function createErrorResponse(
  message: string,
  statusCode: number,
): ErrorResponse {
  return {
    success: false,
    statusCode,
    message,
  };
}
