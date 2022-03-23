import { EndpointConfiguration } from "./model/endpoint-configuration.model";

import blogPost from "./blog-post";
import user from "./user";
import comment from "./comment";

export const allEndpoints: EndpointConfiguration[] = [
  ...blogPost,
  ...user,
  ...comment,
];
