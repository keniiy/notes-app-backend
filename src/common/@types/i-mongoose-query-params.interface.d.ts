import { PopulateOptions } from 'mongoose';

export interface FindMany {
  search?: string;
  sort?: string | string[];
  populate?: Array<string | PopulateOptions>;
  offset?: number;
  limit?: number;
  page?: number;
  period?: Period;
  from?: Date;
  to?: Date;
}

export enum Period {
  Today = 'today',
  Seven = '7',
  LastMonth = 'lastmonth',
  all = 'all',
  range = 'range',
}
export interface FindOne {
  search?: string;
  populate?: Array<string | PopulateOptions>;
}
