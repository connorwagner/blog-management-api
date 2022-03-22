import { Nullable } from "../types/nullable.type";
import { isUser, User } from "./user.model";

export interface Comment {
  id: number;

  author: User;
  content: string;
  parentPostId: Nullable<number>;
  parentCommentId: Nullable<number>;
}

export const isComment = (comment: any): comment is Comment => {
  const coercedComment = comment as Comment;
  return (
    typeof coercedComment.id === "number" &&
    isUser(coercedComment.author) &&
    typeof coercedComment.content === "string" &&
    (typeof coercedComment.parentPostId === "number" ||
      typeof coercedComment.parentCommentId === "number")
  );
};
