import { Nullable } from "../type/nullable.type";

export interface Comment {
  authorId: number;
  content: string;
  parentPostId: Nullable<number>;
  parentCommentId: Nullable<number>;
}

export const isComment = (
  comment: any,
  options: { partial: boolean; noId: boolean } = { partial: false, noId: false }
): comment is Comment => {
  const coercedComment = comment as Comment;

  if (options.partial)
    return (
      typeof coercedComment.authorId === "number" ||
      typeof coercedComment.content === "string" ||
      typeof coercedComment.parentPostId === "number" ||
      typeof coercedComment.parentCommentId === "number"
    );

  if (options.noId)
    return (
      typeof coercedComment.authorId === "number" &&
      typeof coercedComment.content === "string"
    );

  return (
    typeof coercedComment.authorId === "number" &&
    typeof coercedComment.content === "string" &&
    (typeof coercedComment.parentPostId === "number" ||
      typeof coercedComment.parentCommentId === "number")
  );
};
