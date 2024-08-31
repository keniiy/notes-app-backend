import {
  FilterQuery,
  UpdateQuery,
  Document,
  ClientSession,
  QueryOptions,
} from 'mongoose';
import { PaginateResult } from '@common/@types';
import { FindMany } from './find-many.interface';

export interface IAbstractRepository<T extends Document> {
  /**
   * Finds a single document based on the provided filter criteria.
   *
   * @param filterQuery The criteria to filter the documents.
   * @param projection Optional projection to limit the fields returned in the document.
   * @param options Additional query options.
   * @returns A promise that resolves to the found document, or null if no document matches the criteria.
   */
  findOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, any>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Finds a single document based on the provided filter criteria and updates it.
   *
   * @param filter The criteria to filter the documents.
   * @param update The updates to apply to the document.
   * @param options Additional options for the query.
   * @returns A promise that resolves to the updated document, or null if no document matches the criteria.
   */
  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: { session?: ClientSession },
  ): Promise<T | null>;

  /**
   * Finds a document based on the filter criteria, and if it exists, updates it.
   * If it doesn't exist, a new document is created.
   *
   * @param filterQuery The criteria to filter the documents.
   * @param document The document data to update or insert.
   * @param options Additional options for the query.
   * @returns A promise that resolves to the updated or inserted document, or null if the operation fails.
   */
  upsert(
    filterQuery: FilterQuery<any>,
    document: UpdateQuery<any>,
    options?: { session?: ClientSession },
  ): Promise<T | null>;

  /**
   * Creates a new document in the database.
   *
   * @param createEntityData The data for the new document.
   * @param options Additional options for the query.
   * @returns A promise that resolves to the created document.
   */
  create(createEntityData: Record<string, any>, options?: any): Promise<T>;

  /**
   * Creates a new document instance in memory. This doesn't save the document to the database.
   *
   * @param createEntityData The data for the new document instance.
   * @returns The created document instance.
   */
  newInstance(createEntityData: Partial<T>): Promise<T>;

  /**
   * Finds multiple documents that match the provided filter criteria.
   *
   * @param filterQuery The criteria to filter the documents.
   * @param projections Optional projection to limit the fields returned in the documents.
   * @param options Additional options for the query.
   * @returns A promise that resolves to an array of found documents, or null if no documents match the criteria.
   */
  find(
    filterQuery?: FilterQuery<T>,
    projections?: any,
    options?: QueryOptions,
  ): Promise<T[] | null>;

  /**
   * Finds multiple documents based on the filter criteria and paginates the results.
   *
   * @param condition The criteria to filter the documents.
   * @param findMany Options for pagination and additional filtering.
   * @returns A promise that resolves to the paginated result of found documents.
   */
  findManyWithPagination(
    condition: FilterQuery<T>,
    findMany: FindMany,
  ): Promise<PaginateResult<T>>;

  /**
   * Finds a document by its unique ID.
   *
   * @param id The unique ID of the document to find.
   * @param projection Optional projection to limit the fields returned in the document.
   * @param options Additional options for the query.
   * @returns A promise that resolves to the found document, or null if no document matches the ID.
   */
  findById(
    id: string,
    projection?: Record<string, any>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Finds a document based on the filter criteria and deletes it.
   *
   * @param filter The criteria to filter the documents.
   * @param options Additional options for the query.
   * @returns A promise that resolves to the deleted document, or null if no document matches the criteria.
   */
  findOneAndDelete(
    filter: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Counts the number of documents that match the provided filter criteria.
   *
   * @param filter The criteria to filter the documents.
   * @returns A promise that resolves to the number of matching documents.
   */
  count(filter?: FilterQuery<T>): Promise<number>;

  /**
   * Retrieves a list of distinct values for a specified field in the collection.
   *
   * @param field The field for which to find distinct values.
   * @param filterQuery Optional filter criteria to narrow down the documents.
   * @returns A promise that resolves to an array of distinct values.
   */
  distinct(field: string, filterQuery?: FilterQuery<T>): Promise<any[]>;
}
