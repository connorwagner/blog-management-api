import { User } from "./user.model";

export interface BlogPost {
  id: number;

  title: string;
  author: User;
  content: string;
  timestamp: Date;
}
