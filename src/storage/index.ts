import { UserStorage } from "./user-storage";
import { BlogPostStorage } from "./blog-post-storage";
import { CommentStorage } from "./comment-stroage";

export const userStorage = UserStorage.singleton;
export const blogPostStorage = BlogPostStorage.singleton;
export const commentStorage = CommentStorage.singleton;
