export interface ErrorCode {
  exceptionCode: ExceptionCode;
  message: string;
}

export type ExceptionCode =
  | "undefined"
  | "optimisticLock"
  | "registrationError"
  | "invalidData"
  | "invalidLoginData"
  | "invalidPassword"
  | "userNotVerified"
  | "identicalEmail"
  | "internalServerError"
  | "notFound"
  | "userNotFound"
  | "themeNotFound"
  | "somethingWentWrong"
  | "accessDenied"
  | "jwtTokenInvalid"
  | "validationError"
  | "rollback"
  | "unexpectedRollback"
  | "transaction";
