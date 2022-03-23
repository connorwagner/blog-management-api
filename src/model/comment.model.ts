import { Nullable } from "../type/nullable.type";

export interface Comment {
  authorId: number;
  content: string;
  parentPostId: Nullable<number>;
  parentCommentId: Nullable<number>;
}

export const isComment = (comment: any): comment is Comment => {
  const coercedComment = comment as Comment;
  return (
    typeof coercedComment.authorId === "number" &&
    typeof coercedComment.content === "string" &&
    (typeof coercedComment.parentPostId === "number" ||
      typeof coercedComment.parentCommentId === "number")
  );
};
