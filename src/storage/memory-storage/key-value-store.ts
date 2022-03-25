import { Nullable } from "../../type/nullable.type";
import { IKeyValueStore } from "./model/key-value-store.model";

export class KeyValueStore<T> implements IKeyValueStore<T> {
  protected dataStore: { [id: number]: T } = {};

  get(id: number): Promise<Nullable<T>> {
    return Promise.resolve(this.dataStore[id]);
  }

  set(value: T, id: Nullable<number>): Promise<number> {
    id = this.getNextId(id);
    this.dataStore[id] = value;
    return Promise.resolve(id);
  }

  delete(id: number): Promise<void> {
    delete this.dataStore[id];
    return Promise.resolve();
  }

  private getNextId(id: Nullable<number>): number {
    if (!!id) return id;

    const ids = Object.keys(this.dataStore).map((key) => parseInt(key));
    if (ids.length === 0) return 1;

    const maxId = Math.max(...ids);
    return maxId + 1;
  }
}
