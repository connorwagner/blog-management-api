export interface BlogPost {
  title: string;
  authorId: number;
  content: string;
  timestamp: Date;
}

export const isBlogPost = (
  blogPost: any,
  options: { partial: boolean } = { partial: false }
): blogPost is BlogPost => {
  const coercedBlogPost = blogPost as BlogPost;

  if (options.partial)
    return (
      typeof coercedBlogPost.title === "string" ||
      typeof coercedBlogPost.authorId === "number" ||
      typeof coercedBlogPost.content === "string" ||
      !!Date.parse(blogPost.timestamp)
    );

  return (
    typeof coercedBlogPost.title === "string" &&
    typeof coercedBlogPost.authorId === "number" &&
    typeof coercedBlogPost.content === "string" &&
    !!Date.parse(blogPost.timestamp)
  );
};
