import { Nullable } from "../../../type/nullable.type";
import { Storage } from "../../model/storage.model";

export interface IKeyValueStore<T> extends Storage<T> {
  get(id: number): Promise<Nullable<T>>;
  set(value: T, id: Nullable<number>): Promise<number>;
  delete(id: number): Promise<void>;
}
