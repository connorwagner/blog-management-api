import { RequestHandler } from "express";
import { blogPostStorage } from "../../../storage";
import {
  entityExistsValidator,
  ShouldEnsureEntityExists,
} from "../../validator/entity-exists-validator";

export const blogPostExistsValidator = (
  options: {
    idBodyProperty?: string;
    ensureBlogPostExists?: ShouldEnsureEntityExists;
  } = {}
): RequestHandler => {
  const { idBodyProperty, ensureBlogPostExists: ensureBlogPostExistsOption } =
    options;
  const ensureBlogPostExists =
    ensureBlogPostExistsOption ?? ShouldEnsureEntityExists.Always;

  return entityExistsValidator(blogPostStorage, {
    idBodyProperty,
    ensureExists: ensureBlogPostExists,
    entityName: "BlogPost",
  });
};
