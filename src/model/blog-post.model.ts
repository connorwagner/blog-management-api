export interface BlogPost {
  title: string;
  authorId: number;
  content: string;
  timestamp: Date;
}

export const isBlogPost = (blogPost: any): blogPost is BlogPost => {
  const coercedBlogPost = blogPost as BlogPost;
  return (
    typeof coercedBlogPost.title === "string" &&
    typeof coercedBlogPost.authorId === "number" &&
    typeof coercedBlogPost.content === "string" &&
    !!Date.parse(blogPost.timestamp)
  );
};
