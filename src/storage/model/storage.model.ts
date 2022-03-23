import { BlogPost } from "../../model/blog-post.model";
import { Comment } from "../../model/comment.model";
import { User } from "../../model/user.model";
import { Nullable } from "../../type/nullable.type";

export interface Storage {
  getUser: (id: number) => Promise<Nullable<User>>;
  setUser: (user: User, id?: number) => Promise<number>;
  deleteUser: (id: number) => Promise<void>;

  getBlogPost: (id: number) => Promise<Nullable<BlogPost>>;
  setBlogPost: (blogPost: BlogPost, id?: number) => Promise<number>;
  deleteBlogPost: (id: number) => Promise<void>;

  getComment: (id: number) => Promise<Nullable<Comment>>;
  setComment: (comment: Comment, id?: number) => Promise<number>;
  deleteComment: (id: number) => Promise<void>;
}
