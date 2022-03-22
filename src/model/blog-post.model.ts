import { isUser, User } from "./user.model";

export interface BlogPost {
  id: number;

  title: string;
  author: User;
  content: string;
  timestamp: Date;
}

export const isBlogPost = (blogPost: any): blogPost is BlogPost => {
  const coercedBlogPost = blogPost as BlogPost;
  return (
    typeof coercedBlogPost.id === "number" &&
    typeof coercedBlogPost.title === "string" &&
    isUser(coercedBlogPost.author) &&
    typeof coercedBlogPost.content === "string" &&
    !!Date.parse(blogPost.timestamp)
  );
};
