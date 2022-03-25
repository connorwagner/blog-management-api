import { RequestHandler } from "express";
import { userStorage } from "../../../storage";
import {
  entityExistsValidator,
  ShouldEnsureEntityExists,
} from "../../validator/entity-exists-validator";

export const userExistsValidator = (
  options: {
    idBodyProperty?: string;
    ensureUserExists?: ShouldEnsureEntityExists;
  } = {}
): RequestHandler => {
  const { idBodyProperty, ensureUserExists: ensureAuthorExistsOption } =
    options;
  const ensureUserExists =
    ensureAuthorExistsOption ?? ShouldEnsureEntityExists.Always;

  return entityExistsValidator(userStorage, {
    idBodyProperty,
    ensureExists: ensureUserExists,
    entityName: "User",
  });
};
