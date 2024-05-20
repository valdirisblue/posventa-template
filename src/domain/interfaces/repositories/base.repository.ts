export interface BaseRepository<T, U> {
  create: (entity: T) => Promise<T>;
  delete: (id: U) => Promise<T | null>;
  update: (id: U, entity: Partial<T>) => Promise<T | null>;
  findById: (id: U) => Promise<T | null>;
  findAll: () => Promise<T[]>;
}
