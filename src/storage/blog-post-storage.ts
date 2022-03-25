import { BlogPost } from "../model/blog-post.model";
import { KeyValueStore } from "./memory-storage/key-value-store";

export class BlogPostStorage extends KeyValueStore<BlogPost> {
  private constructor() {
    super();
  }

  static singleton = new BlogPostStorage();
}
