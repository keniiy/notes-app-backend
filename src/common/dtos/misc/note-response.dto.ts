import { NoteDocument } from '@common/DAL';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

export class NoteResponseDto {
  @ApiProperty({ example: '64e839c5f1a1b2c4d4f7890a' })
  id: string;

  @ApiProperty({ example: 'My First Note' })
  title: string;

  @ApiProperty({ example: 'This is the content of the note.' })
  content: string;

  @ApiProperty({ example: '2024-08-31T01:41:20.407Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-31T01:41:20.407Z' })
  updatedAt: Date;

  /**
   * Constructs a new NoteResponseDto from a NoteDocument.
   *
   * @param note The NoteDocument to construct from.
   */
  constructor(note: NoteDocument) {
    this.id = note._id.toString();
    this.title = note.title;
    this.content = note.content;
    this.createdAt = note.createdAt;
    this.updatedAt = note.updatedAt;
  }
}

export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Note created successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    required: true,
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

export class DeleteSuccessResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 204 })
  statusCode: number;

  @ApiProperty({ example: 'Note deleted successfully' })
  message: string;

  /**
   * Constructs a new DeleteSuccessResponseDto with the given properties.
   *
   * @param statusCode The HTTP status code to include in the response.
   * @param message The message to include in the response.
   */
  constructor(statusCode: number, message: string) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Operation failed' })
  message: string;

  /**
   * Constructs a new ErrorResponseDto with the given properties.
   *
   * @param statusCode The HTTP status code to include in the response.
   * @param message The message to include in the response.
   */
  constructor(statusCode: number, message: string) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class NotePaginatedResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  hasNextPage: boolean;

  @ApiProperty({ type: Boolean, example: true })
  hasPrevPage: boolean;

  @ApiProperty({ type: Number, example: 10 })
  limit: number;

  @ApiProperty({ type: Number, example: 0 })
  offset: number;

  @ApiProperty({ type: Number, example: 2 })
  page: number;

  @ApiProperty({ type: Number, example: 11 })
  pagingCounter: number;

  @ApiProperty({ type: Number, example: 23 })
  totalDocs: number;

  @ApiProperty({ type: Number, example: 3 })
  totalPages: number;

  @ApiProperty({ type: Number, example: 3, required: false })
  nextPage?: number;

  @ApiProperty({ type: Number, example: 1, required: false })
  prevPage?: number;

  @ApiProperty({ type: [NoteResponseDto] })
  docs: NoteResponseDto[];

  /**
   * Constructs a new NotePaginatedResponseDto from a PaginateResult of NoteDocument.
   *
   * @param paginatedResult The PaginateResult<NoteDocument> to construct from.
   */
  constructor(paginatedResult: PaginateResult<NoteDocument>) {
    this.hasNextPage = paginatedResult.hasNextPage;
    this.hasPrevPage = paginatedResult.hasPrevPage;
    this.limit = paginatedResult.limit;
    this.offset = paginatedResult.offset;
    this.page = paginatedResult.page;
    this.pagingCounter = paginatedResult.pagingCounter;
    this.totalDocs = paginatedResult.totalDocs;
    this.totalPages = paginatedResult.totalPages;
    this.nextPage = paginatedResult.nextPage;
    this.prevPage = paginatedResult.prevPage;
    this.docs = paginatedResult.docs.map((note) => new NoteResponseDto(note));
  }
}
