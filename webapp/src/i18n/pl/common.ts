import { ExceptionCode } from "@/types/ErrorCode";

const error = {
  loadingError: "Wystąpił błąd przy wczytywaniu danych.",
  baseTitle: "Wystąpił błąd",
  baseDescription: "Coś poszło nie tak...",
  userBlocked: "Twoje konto jest zablokowane",
  internalServerErrorDescription:
    "Ups! Coś poszło nie tak po naszej stronie. Proszę spróbuj ponownie później.",
};

const validation = {
  characters: "znak(i/ów)",
  minLength: "Pole musi zawierać minimalnie",
  maxLength: "Pole musi zawierać maksymalnie",
};

const errors = {
  optimisticLock: "Nie pracujesz na najnowszych danych",
  registrationError: "Błąd podczas rejestracji",
  invalidData: "Nieprawidłowe dane",
  identicalEmail: "Użytkownik o podanym adresie email już istnieje",
  notFound: "Nie znaleziono",
  userNotFound: "Użytkownik nie znaleziony",
  themeNotFound: "Nie znaleziono motywu",
  productNotFound: "Nie znaleziono produktu",
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

const mineralsInformation = {
  mineralDrvChart: {
    title: "Zawartość minerałów w produkcie",
    description:
      "W odniesieniu do Rekomendowanej Wartości Spożycia dla osoby dorosłej",
  },
  mineralDataUnavailable: "Brak danych o minerałach do wyświetlenia.",
  mineralNutritionalValues: {
    title: "Zawartość minerałów w produkcie",
    description:
      "W odniesieniu do Rekomendowanej Wartości Spożycia dla osoby dorosłej",
    table: {
      mineral: "Minerał",
      quantity: "Ilość",
      unit: "Jednostka",
      rwsPercentage: "% RWS",
    },
  },
};

const RWSChart = {
  rws: "100% RWS",
};
const minerals = {
  Potas: "Potas",
  Wapń: "Wapń",
  Fosfor: "Fosfor",
  Magnez: "Magnez",
  Żelazo: "Żelazo",
  Cynk: "Cynk",
  Fluorek: "Fluorek",
  Mangan: "Mangan",
  Miedź: "Miedź",
  Jod: "Jod",
  Selen: "Selen",
  Molibden: "Molibden",
  Chrom: "Chrom",
};

const vitaminsInformation = {
  vitaminDrvChart: {
    title: "Zawartość witamin w produkcie",
    description:
      "W odniesieniu do Rekomendowanej Wartości Spożycia dla osoby dorosłej",
  },
  vitaminDataUnavailable: "Brak danych o witaminach do wyświetlenia.",
  vitaminNutritionalValues: {
    title: "Zawartość witamin w produkcie",
    description:
      "W odniesieniu do Rekomendowanej Wartości Spożycia dla osoby dorosłej",
    table: {
      vitamin: "Witamina",
      quantity: "Ilość",
      unit: "Jednostka",
      rwsPercentage: "% RWS",
    },
  },
};

const vitamins = {
  "Witamina A": "Witamina A",
  "Witamina B1": "Witamina B1",
  "Witamina B2": "Witamina B2",
  "Witamina B3": "Witamina B3",
  "Witamina B5": "Witamina B5",
  "Witamina B6": "Witamina B6",
  "Witamina B7": "Witamina B7",
  "Witamina B9": "Witamina B9",
  "Witamina B12": "Witamina B12",
  "Witamina C": "Witamina C",
  "Witamina D": "Witamina D",
  "Witamina E": "Witamina E",
  "Witamina K": "Witamina K",
};

const base = {
  noData: "Brak danych",
};

const loginButton = {
  googleLoginButton: "Zaloguj się za pomocą Google",
  githubLoginButton: "Zaloguj się za pomocą GitHub",
};

const axiosPrivate = {
  unauthorized: "Nieautoryzowany dostęp",
  unauthorizedDescription: "Brak autoryzacji dla tej akcji",
};

const sessionExpiredDialog = {
  title: "Sesja wygasła",
  description:
    "Zaloguj się ponownie lub kontynuuj z ograniczoną funkcjonalnością",
  signOut: "Kontynuuj bez ponownego logowania",
};

const authGuard = {
  noAccess: "Brak dostępu",
  noAccessDescription: "Brak dostępu do tego zasobu",
};

const login = {
  accountCreated: "Konto zostało pomyślnie utworzone",
  accountCreatedDescription:
    "Twoje konto zostało utworzone, a Ty jesteś teraz zalogowany.",
  loggedIn: "Zalogowano pomyślnie",
  loggedInDescription: "Zostałeś pomyślnie zalogowany.",
  loginError: "Błąd logowania",
  tryAgain: "Wystąpił błąd podczas logowania. Spróbuj ponownie.",
};

const logout = {
  successTitle: "Wylogowano",
  successDescription: "Zostałeś pomyślnie wylogowany.",
};

const addFavoriteProduct = {
  successTitle: "Dodano do ulubionych",
  successDescription: "Produkt został dodany do Twoich ulubionych.",
  error: "Nie udało się dodać do ulubionych",
};

const removeFavoriteProduct = {
  successTitle: "Usunięto z ulubionych",
  successDescription: "Produkt został usunięty z Twoich ulubionych.",
  error: "Nie udało się usunąć z ulubionych",
};

const favoriteInfo = {
  productInFavorites: "Produkt jest w Twoich ulubionych!",
  addToFavorites: "Dodaj do ulubionych!",
  countFavorites: "{{count}} użytkowników dodało ten produkt do ulubionych.",
};

const productsPage = {
  title: "Lista Produktów",
  searchPlaceholder: "Szukaj produktów...",
  searchButton: "Szukaj",
  clearFiltersButton: "Wyczyść filtry",
  pageIndicator: "Strona {{currentPage}} z {{totalPages}}",
  noProducts: "Brak dostępnych produktów.",
  breadcrumbs: {
    home: "Strona Główna",
    list: "Lista Produktów",
  },
};

const productDetails = {
  title: "Szczegóły Produktu",
  breadcrumbs: {
    home: "Strona Główna",
    productList: "Lista Produktów"
  },
  noData: "Brak danych",
  description: "Opis",
  eanCode: "Kod EAN",
  quantity: "Ilość",
  countryOfOrigin: "Kraj Pochodzenia",
  packageType: "Typ Opakowania",
  addToCompare: "Dodaj do porównania",
  producerInfo: "Informacje o producencie",
  producer: "Producent",
  address: "Adres",
  nip: "NIP",
  contact: "Kontakt",
  nutritionalValue: "Wartość Odżywcza",
  basic: "Podstawowe",
  vitaminsAndMinerals: "Witaminy i Minerały",
  omega3: "Omega 3",
  additional: "Dodatkowe",
  loadingError: "Błąd ładowania danych"
};

const notFound = {
  title: "Nie znaleziono strony",
  description: "Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.",
  homeLink: "Wróć do strony głównej"
};

const productCard = {
  dropdown: {
    details: "Szczegóły Produktu",
    addToComparison: "Dodaj do porównania",
    replaceProduct: "Zastąp produkt: ",
    removeProduct: "Usuń produkt z porównania"
  },
  eanCode: "Kod EAN: {{ean}}",
}

const favouriteProducts = {
  title: "Lista Ulubionych Produktów",
  searchPlaceholder: "Szukaj ulubionych produktów...",
  searchButton: "Szukaj",
  clearFiltersButton: "Wyczyść filtry",
  pageIndicator: "Strona {{currentPage}} z {{totalPages}}",
  noProducts: "Brak dostępnych ulubionych produktów.",
  breadcrumbs: {
    home: "Strona Główna",
    list: "Lista Ulubionych Produktów",
  },
};

const nutritionalChart = {
  title: "Podstawowe makroskładniki",
  description: "na 100 {{unit}} produktu",
  energyUnit: "kcal",
  carbohydrates: "Węglowodany",
  fat: "Tłuszcz",
  fatName: "Total",
  protein: "Białko",
};

const fatSaturation = {
  title: "Tłuszcze",
  description: "na 100 {{unit}} produktu",
  noFat: "Brak tłuszczu w produkcie",
  saturatedFatLabel: "Nasycone Kwasy Tłuszczowe",
  unsaturatedFatLabel: "Pozostałe tłuszcze",
  chartLabel: "nasycone kwasy tłuszczowe / total tłuszcze",
  lowSaturatedFat: "Niska zawartość tłuszczów nasyconych w produkcie",
  highSaturatedFat: "Wysoka zawartość tłuszczów nasyconych w produkcie",
  moderateSaturatedFat: "Umiarkowana zawartość tłuszczów nasyconych w produkcie",
};

const ingredients = {
  title: "Skład",
  noData: "Brak dostępnych danych dotyczących składników oraz dodatków.",
  ingredientsHeader: "Składniki",
  additionsHeader: "Numery Dodatków",
};

const allergens = {
  title: "Alergeny",
  noData: "Brak alergenów",
};

const sugarChart = {
  title: "Węglowodany",
  description: "na 100 {{unit}} produktu",
  labels: {
    sugar: "Zawartość Cukru",
    nonSugarCarbs: "Pozostałe węglowodany",
  },
  info: {
    lowSugar: "Niska zawartość cukru w produkcie",
    moderateSugar: "Umiarkowana zawartość cukru w produkcie",
    highSugar: "Wysoka zawartość cukru w produkcie",
  },
  noCarbs: "Brak węglowodanów w produkcie",
  tooltip: "zawartość cukru / total węglowodany",
};

const appSidebar = {
  home: "Strona Główna",
  productList: "Lista Produktów",
  compareProducts: "Porównaj Produkty",
  yourSection: "Twoja sekcja",
  favorites: "Ulubione Produkty",
  editPreferences: "Edytuj Preferencje Żywieniowe",
  clearComparison: "Usuń produkty z porównania",
  comparisonSection: "Porównanie produktów",
  slot1: "Produkt 1",
  slot2: "Produkt 2",
};

const userAuth = {
  settings: "Opcje\u00A0użytkownika",
  logout: "Wyloguj się",
  signIn: "Zaloguj się",
}

const productComparisonSlot = {
  noData: "Nie wybrano produktu",
  selectProduct: "Kliknij w symbol powyżej w celu wybrania produktu",
  browseProducts: "Wybierz produkt z listy",
  favoriteProducts: "Wybierz jeden z twoich ulubionych produktów",
}

const compare = {
  selectProducts: "Wybierz oba produkty, aby wyświetlić ich porównanie",
  homePage: "Strona Główna",
  comparePage: "Porównanie Produktów",
  title: "Porównanie Produktów",
}

const sidebarComparisonSlot = {
  addProduct: "Dodaj produkt do porównania",
  browseProducts: "Wybierz produkt z listy",
  favoriteProducts: "Wybierz jeden z twoich ulubionych produktów",
  details: "Szczegóły Produktu",
  removeProduct: "Usuń produkt z porównania",
}

export default {
  sidebarComparisonSlot,
  compare,
  productComparisonSlot,
  userAuth,
  appSidebar,
  sugarChart,
  allergens,
  ingredients,
  fatSaturation,
  nutritionalChart,
  favouriteProducts,
  productCard,
  notFound,
  productDetails,
  productsPage,
  addFavoriteProduct,
  removeFavoriteProduct,
  favoriteInfo,
  error,
  logout,
  login,
  authGuard,
  sessionExpiredDialog,
  axiosPrivate,
  loginButton,
  base,
  vitamins,
  vitaminsInformation,
  errors,
  minerals,
  validation,
  mineralsInformation,
  RWSChart,
} as const;
