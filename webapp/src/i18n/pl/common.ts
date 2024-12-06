import { ExceptionCode } from "@/types/errorCode";

const validation = {
  characters: "znak(i/ów)",
  minLength: "Pole musi zawierać minimalnie",
  maxLength: "Pole musi zawierać maksymalnie",
};

const loginPage = {
  title: "Zaloguj się",
};

const errors = {
  optimisticLock: "Nie pracujesz na najnowszych danych",
  registrationError: "Błąd podczas rejestracji",
  invalidData: "Nieprawidłowe dane",
  invalidLoginData: "Nieprawidłowe dane logowania",
  invalidPassword: "Nieprawidłowe dane logowania",
  userNotVerified: "Twoje konto nie jest zweryfikowane, sprawdź email",
  identicalEmail: "Użytkownik o podanym adresie email już istnieje",
  notFound: "Nie znaleziono",
  userNotFound: "Użytkownik nie znaleziony",
  themeNotFound: "Nie znaleziono motywu",
  somethingWentWrong: "Coś poszło nie tak...",
  accessDenied: "Brak dostępu",
  jwtTokenInvalid: "Sesja wygasła",
  validationError: "Błąd walidacji",
  internalServerError: "Coś poszło nie tak po naszej stronie",
  undefined: "Wystpił nieoczekiwany błąd",
  rollback: "Operacja została cofnięta",
  unexpectedRollback: "Nieoczekiwane cofnięcie operacji",
  transaction: "Błąd transakcji",
} satisfies {
  [key in ExceptionCode]: string;
};

export default {
  validation,
  loginPage,
  errors,
} as const;
