export interface User {
  id: number;

  firstName: string;
  lastName: string;
  email: string;
}

export const isUser = (user: any): user is User => {
  const coercedUser = user as User;
  return (
    typeof coercedUser.id === "number" &&
    typeof coercedUser.firstName === "string" &&
    typeof coercedUser.lastName === "string" &&
    typeof coercedUser.email === "string"
  );
};
