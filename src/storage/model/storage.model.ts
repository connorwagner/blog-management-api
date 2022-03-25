import { Nullable } from "../../type/nullable.type";

export interface Storage<T> {
  get(id: number): Promise<Nullable<T>>;
  set(value: T, id: Nullable<number>): Promise<number>;
  delete(id: number): Promise<void>;
}
