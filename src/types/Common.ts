export interface IMetaData {
  page: number;
  perPage: number;
  totalCount: number;
}

export interface IList<T> {
  data: T[];
  metaData: IMetaData;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
