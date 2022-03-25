import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Comment } from "../../model/comment.model";
import { commentStorage } from "../../storage";
import { idValidator } from "../validator/id-validator";
import { commentValidator } from "./validator/comment-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post(
      "/blogs/:blogId/comments",
      bodyParser.json(),
      idValidator({ paramName: "blogId" }),
      commentValidator({ noId: true }),
      createComment
    );
    app.post(
      "/comments/:commentId/replies",
      bodyParser.json(),
      idValidator({ paramName: "commentId" }),
      commentValidator({ noId: true }),
      createComment
    );
  },
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  const blogId = req.params.blogId;
  const parentCommentId = req.params.commentId;
  const comment = req.body as Comment;
  if (!!blogId) {
    comment.parentPostId = parseInt(blogId);
  }
  if (!!parentCommentId) {
    comment.parentCommentId = parseInt(parentCommentId);
  }
  const id = await commentStorage.set(comment, null);

  res.status(200).send({ id });
};
