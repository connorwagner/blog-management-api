export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export const isUser = (
  user: any,
  options: { partial: boolean } = { partial: false }
): user is User => {
  const coercedUser = user as User;

  if (options.partial)
    return (
      typeof coercedUser.firstName === "string" ||
      typeof coercedUser.lastName === "string" ||
      typeof coercedUser.email === "string"
    );

  return (
    typeof coercedUser.firstName === "string" &&
    typeof coercedUser.lastName === "string" &&
    typeof coercedUser.email === "string"
  );
};
