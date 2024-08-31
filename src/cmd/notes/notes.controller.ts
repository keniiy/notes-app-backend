import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { NOTE_MESSAGES } from '@common/constants/messages.constants';
import {
  ErrorResponseDto,
  SuccessResponseDto,
  DeleteSuccessResponseDto,
  NotePaginatedResponseDto,
} from '@common/dtos';
import { FindNotesDto } from './dto/find-notes.dto';
import { FindNoteDto } from './dto/find-note.dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({ type: CreateNoteDto, description: 'The note to create' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: NOTE_MESSAGES.CREATE_SUCCESS,
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: NOTE_MESSAGES.CREATE_FAILURE,
    type: ErrorResponseDto,
  })

  /**
   * This is a controller method that sends a query
   * to the service to create a new note.
   *
   * @param createNoteDto The data for the new note.
   * @returns A promise that resolves to the created note.
   */
  async create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all notes with pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: NOTE_MESSAGES.RETRIEVE_SUCCESS,
    type: NotePaginatedResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: NOTE_MESSAGES.RETRIEVE_FAILURE,
    type: ErrorResponseDto,
  })
  /**
   * This is a controller method that sends a query to the service to
   * retrieve all notes, with pagination and filtering.
   *
   * @param query The query object to filter and paginate the notes.
   * @returns A promise that resolves to a paginated response of notes.
   */
  async findAll(@Query() query: FindNotesDto) {
    return this.notesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single note by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the note to retrieve' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: NOTE_MESSAGES.RETRIEVE_SUCCESS,
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOTE_MESSAGES.RETRIEVE_FAILURE,
    type: ErrorResponseDto,
  })
  /**
   * This is a controller method that sends a query to the service
   * to retrieve a single note by its ID.
   *
   * @param id The ID of the note to retrieve.
   * @param query Optional query object to filter the note.
   * @returns A promise that resolves to the found note, or throws a NotFoundException if no note matches the ID.
   */
  async findOne(@Param('id') id: string, @Query() query: FindNoteDto) {
    return this.notesService.findOne(id, query);
  }

  /**
   * This is a controller method that sends a query to the service
   * to retrieve a single note by its ID.
   *
   * @param id The ID of the note to retrieve.
   * @param query Optional query object to filter the note.
   * @returns A promise that resolves to the found note.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the note to delete' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: NOTE_MESSAGES.DELETE_SUCCESS,
    type: DeleteSuccessResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOTE_MESSAGES.DELETE_FAILURE,
    type: ErrorResponseDto,
  })
  /**
   * This is a controller method that sends a query to the service
   * to delete a note by its ID.
   *
   * @param id The ID of the note to delete.
   * @returns A promise that resolves to the deleted note.
   */
  async delete(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
