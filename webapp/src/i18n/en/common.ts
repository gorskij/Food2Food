import { ExceptionCode } from "@/types/errorCode";

const validation = {
  characters: "character(s)",
  minLength: "Field must contain at least",
  maxLength: "Field must contain at most",
};

const loginPage = {
  title: "Login",
};

const errors = {
  optimisticLock: "You are not working on the latest data",
  registrationError: "Error while registering",
  invalidData: "Invalid data",
  invalidLoginData: "User with provided login and password not found",
  invalidPassword: "User with provided login and password not found",
  notFound: "Not found",
  userNotFound: "User not found",
  themeNotFound: "Theme not found",
  somethingWentWrong: "Something went wrong...",
  accessDenied: "Access denied",
  jwtTokenInvalid: "Session expired",
  validationError: "Validation error",
  identicalEmail: "User with given email address already exists",
  internalServerError:
    "Something went wrong on our end. Please try again later.",
  undefined: "Unexpected error occurred",
  rollback: "Rollback",
  transaction: "Transaction",
  unexpectedRollback: "Unexpected rollback",
} satisfies {
  [key in ExceptionCode]: string;
};

export default {
  validation,
  loginPage,
  errors,
} as const;
