import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { NoteResponseDto } from './note-response.dto';

export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Note created successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    allOf: [{ $ref: getSchemaPath(NoteResponseDto) }],
  })
  data: T;

  /**
   * Constructs a new SuccessResponseDto with the given properties.
   *
   * @param statusCode The HTTP status code to include in the response.
   * @param message The message to include in the response.
   * @param data The data to include in the response.
   */
  constructor(statusCode: number, message: string, data: T) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
