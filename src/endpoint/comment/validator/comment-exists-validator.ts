import { RequestHandler } from "express";
import { commentStorage } from "../../../storage";
import {
  entityExistsValidator,
  ShouldEnsureEntityExists,
} from "../../validator/entity-exists-validator";

export const commentExistsValidator = (
  options: {
    idBodyProperty?: string;
    ensureCommentExists?: ShouldEnsureEntityExists;
  } = {}
): RequestHandler => {
  const { idBodyProperty, ensureCommentExists: ensureCommentExistsOption } =
    options;
  const ensureUserExists =
    ensureCommentExistsOption ?? ShouldEnsureEntityExists.Always;

  return entityExistsValidator(commentStorage, {
    idBodyProperty,
    ensureExists: ensureUserExists,
    entityName: "User",
  });
};
