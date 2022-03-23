import { BlogPost } from "../model/blog-post.model";
import { User } from "../model/user.model";
import { Nullable } from "../types/nullable.type";
import { Storage } from "./model/storage.model";
import { Comment } from "../model/comment.model";

export const memoryStorage: Storage = {
  getUser: function (id: number): Promise<Nullable<User>> {
    return Promise.resolve(dataStore.users[id]);
  },
  setUser: function (user: User, id?: number): Promise<number> {
    id = getNextId(dataStore.users, id);
    dataStore.users[id] = user;
    return Promise.resolve(id);
  },
  deleteUser(id: number): Promise<void> {
    delete dataStore.users[id];
    return Promise.resolve();
  },

  getBlogPost: function (id: number): Promise<Nullable<BlogPost>> {
    return Promise.resolve(dataStore.blogPosts[id]);
  },
  setBlogPost: function (blogPost: BlogPost, id?: number): Promise<number> {
    id = getNextId(dataStore.blogPosts, id);
    dataStore.blogPosts[id] = blogPost;
    return Promise.resolve(id);
  },
  deleteBlogPost(id: number): Promise<void> {
    delete dataStore.blogPosts[id];
    return Promise.resolve();
  },

  getComment: function (id: number): Promise<Nullable<Comment>> {
    return Promise.resolve(dataStore.comments[id]);
  },
  setComment: function (comment: Comment, id?: number): Promise<number> {
    id = getNextId(dataStore.comments, id);
    dataStore.comments[id] = comment;
    return Promise.resolve(id);
  },
  deleteComment(id: number): Promise<void> {
    delete dataStore.comments[id];
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

const getNextId = (store: { [id: number]: any }, id?: number): number => {
  if (!!id) return id;

  const ids = Object.keys(store).map((key) => parseInt(key));
  if (ids.length === 0) return 1;

  const maxId = Math.max(...ids);
  return maxId + 1;
};
