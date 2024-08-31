import { HttpStatus } from '@nestjs/common';
import { SuccessResponse } from '@common/@types';
import { ErrorResponseDto } from '@common/dtos';

/**
 * Handles a service call and returns a standardized response.
 *
 * @param serviceCall The service call to handle.
 * @param successMessage The message to include in the response when the service call succeeds.
 * @param successStatus The HTTP status code to include in the response when the service call succeeds.
 * @returns A standardized response object with the result of the service call.
 *
 * @example
 * const result = await handleServiceCall(
 *   async () => this.userService.findOne(1),
 *   'User found successfully',
 *   HttpStatus.OK,
 * );
 * // result = { success: true, statusCode: 200, message: 'User found successfully', data: User }
 *
 * @throws {ErrorResponseDto}
 * Thrown if the service call throws an error.
 * @throws {Error}
 * Thrown if the service call throws an error and the error does not have a `status` property.
 *
 * @beta
 */
export async function handleServiceCall<T>(
  serviceCall: () => Promise<T>,
  successMessage: string,
  successStatus: HttpStatus = HttpStatus.OK,
): Promise<SuccessResponse<T> | ErrorResponseDto> {
  try {
    const result = await serviceCall();
    return {
      success: true,
      statusCode: successStatus,
      message: successMessage,
      data: result,
    };
  } catch (error) {
    return new ErrorResponseDto(
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'An unexpected error occurred',
    );
  }
}
