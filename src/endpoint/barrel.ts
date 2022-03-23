import { EndpointConfiguration } from "./model/endpoint-configuration.model";

import blogPost from "./blog-post";
import user from "./user";

export const allEndpoints: EndpointConfiguration[] = [...blogPost, ...user];
