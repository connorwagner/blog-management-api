import { Nullable } from "../types/nullable.type";
import { User } from "./user.model";

export interface Comment {
  id: number;

  author: User;
  content: string;
  parentPostId: Nullable<number>;
  parentCommentId: Nullable<number>;
}
