import { AbstractRepository } from '@common/DAL/abstract';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { NoteDocument } from '../models';

@Injectable()
export class NotesRepository extends AbstractRepository<NoteDocument> {
  /**
   * The constructor for the NotesRepository class.
   *
   * @param {Model<NoteDocument>} notesModel The mongoose model for the notes collection.
   * @param {Connection} connection The mongoose connection to the database.
   */
  constructor(
    @InjectModel('notes') private readonly notesModel: Model<NoteDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(notesModel, connection);
  }
}
