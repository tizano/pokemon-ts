export type AddNullable<T> = {
  [K in keyof T]: NonNullable<T[K]> | null;
};
