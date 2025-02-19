export interface ErrorCode {
  exceptionCode: ExceptionCode;
  message: string;
}

export type ExceptionCode =
  | "undefined"
  | "optimisticLock"
  | "registrationError"
  | "invalidData"
  | "identicalEmail"
  | "internalServerError"
  | "notFound"
  | "userNotFound"
  | "productNotFound"
  | "somethingWentWrong"
  | "accessDenied"
  | "jwtTokenInvalid"
  | "validationError"
  | "rollback"
  | "unexpectedRollback"
  | "transaction"
  | "userBlocked"
  | "administratorOwnRoleRemoval"
  | "administratorOwnBlock"
  | "unknownError";
