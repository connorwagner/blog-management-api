import { KeyValueStore } from "./memory-storage/key-value-store";
import { Comment } from "../model/comment.model";

export class CommentStorage extends KeyValueStore<Comment> {
  private constructor() {
    super();
  }

  static singleton = new CommentStorage();
}
