export type CustomQuery<T> = {
  data: T;
};

export type QueryWithPagination<T> = {
  page: number;
  itemsPerPage: number;
  count: number;
} & CustomQuery<T>;
