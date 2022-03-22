import { BlogPost } from "../model/blog-post.model";
import { User } from "../model/user.model";
import { Nullable } from "../types/nullable.type";
import { Storage } from "./model/storage.model";
import { Comment } from "../model/comment.model";

export const memoryStorage: Storage = {
  getUser: function (id: number): Promise<Nullable<User>> {
    return Promise.resolve(dataStore.users[id]);
  },
  setUser: function (user: User): Promise<void> {
    dataStore.users[user.id] = user;
    return Promise.resolve();
  },

  getBlogPost: function (id: number): Promise<Nullable<BlogPost>> {
    return Promise.resolve(dataStore.blogPosts[id]);
  },
  setBlogPost: function (blogPost: BlogPost): Promise<void> {
    dataStore.blogPosts[blogPost.id] = blogPost;
    return Promise.resolve();
  },

  getComment: function (id: number): Promise<Nullable<Comment>> {
    return Promise.resolve(dataStore.comments[id]);
  },
  setComment: function (comment: Comment): Promise<void> {
    dataStore.comments[comment.id] = comment;
    return Promise.resolve();
  },
};

interface DataStore {
  users: {
    [id: number]: User;
  };
  blogPosts: {
    [id: number]: BlogPost;
  };
  comments: {
    [id: number]: Comment;
  };
}

const dataStore: DataStore = {
  users: {},
  blogPosts: {},
  comments: {},
};
