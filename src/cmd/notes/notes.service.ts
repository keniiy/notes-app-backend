import {
  Injectable,
  HttpStatus,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { FindNotesDto } from './dto/find-notes.dto';
import { FindNoteDto } from './dto/find-note.dto';
import { handleServiceCall } from '@common/utils';
import { NotesRepository } from '@common/DAL';
import { NotePaginatedResponseDto, NoteResponseDto } from '@common/dtos';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(private readonly notesRepository: NotesRepository) {}

  /**
   * Creates a new note in the database.
   * @param createNoteDto The data for the new note.
   * @returns A promise that resolves to the created note.
   * @throws {NotFoundException} If the note could not be created.
   */
  async create(createNoteDto: CreateNoteDto) {
    return handleServiceCall(
      async () => {
        const note = await this.notesRepository.create(createNoteDto);
        return new NoteResponseDto(note);
      },
      'Note created successfully',
      HttpStatus.CREATED,
    );
  }

  /**
   * Finds all notes that match the given filter query.
   * @param query The query to filter the notes.
   * @returns A promise that resolves to a paginated response of notes.
   */
  async findAll(query: FindNotesDto) {
    return handleServiceCall(async () => {
      const notes = await this.notesRepository.findManyWithPagination(
        {},
        query,
      );
      return new NotePaginatedResponseDto(notes);
    }, 'Notes loaded successfully');
  }

  /**
   * Finds a single note by its unique ID.
   * @param id The ID of the note to find.
   * @param query Optional query to filter the note.
   * @returns A promise that resolves to the found note, or throws a NotFoundException if no note matches the ID.
   */
  async findOne(id: string, query: FindNoteDto) {
    return handleServiceCall(async () => {
      const note = await this.notesRepository.findOne({ _id: id }, query);
      if (!note) throw new NotFoundException(`Note with ID ${id} not found`);
      return new NoteResponseDto(note);
    }, 'Note loaded successfully');
  }

  /**
   * Deletes a single note by its unique ID.
   * @param id The ID of the note to delete.
   * @returns A promise that resolves to the deleted note, or throws a NotFoundException if no note matches the ID.
   */
  async remove(id: string) {
    return handleServiceCall(
      async () => {
        const note = await this.notesRepository.findOneAndDelete({ _id: id });
        if (!note) throw new NotFoundException(`Note with ID ${id} not found`);
        return new NoteResponseDto(note);
      },
      'Note deleted successfully',
      HttpStatus.NO_CONTENT,
    );
  }
}
