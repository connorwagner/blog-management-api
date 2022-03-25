import { User } from "../model/user.model";
import { KeyValueStore } from "./memory-storage/key-value-store";

export class UserStorage extends KeyValueStore<User> {
  private constructor() {
    super();
  }

  static singleton = new UserStorage();
}
