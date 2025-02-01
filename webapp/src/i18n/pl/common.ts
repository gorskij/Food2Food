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
  unknownError: "Coś poszło nie tak...",
} satisfies {
  [key in ExceptionCode]: string;
};

const mineralsInformation = {
  title: "Zawartość minerałów w produkcie",
  description:
    "W odniesieniu do Rekomendowanej Wartości Spożycia (RWS) dla osoby dorosłej na 100\u00A0{{unit}} produktu.",
  mineralDataUnavailable: "Brak danych o minerałach do wyświetlenia",
  table: {
    mineral: "Minerał",
    quantity: "Ilość",
    unit: "Jednostka",
    rwsPercentage: "% RWS",
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
  title: "Zawartość witamin w produkcie",
  description:
    "W odniesieniu do Rekomendowanej Wartości (RWS) Spożycia dla osoby dorosłej na 100\u00A0{{unit}} produktu.",
  vitaminDataUnavailable: "Brak danych o witaminach do wyświetlenia",
  table: {
    vitamin: "Witamina",
    quantity: "Ilość",
    unit: "Jednostka",
    rwsPercentage: "% RWS",
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
  unauthorizedDescription: "Brak autoryzacji dla tej akcji.",
};

const sessionExpiredDialog = {
  title: "Sesja wygasła",
  description:
    "Zaloguj się ponownie lub kontynuuj z ograniczoną funkcjonalnością.",
  signOut: "Kontynuuj bez ponownego logowania",
};

const authGuard = {
  noAccess: "Brak dostępu",
  noAccessDescription: "Brak dostępu do tego zasobu.",
};

const login = {
  accountCreated: "Konto zostało pomyślnie utworzone",
  accountCreatedDescription:
    "Twoje konto zostało utworzone, a Ty jesteś teraz zalogowany.",
  loggedIn: "Zalogowano pomyślnie",
  loggedInDescription: "Zostałeś pomyślnie zalogowany.",
  loginError: "Błąd logowania",
  tryAgain: "Wystąpił błąd podczas logowania. Spróbuj ponownie.",
  creationError: "Błąd rejestracji",
  creationErrorDescription:
    "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.",
  emailConflict: "Konflikt adresów email",
  emailConflictDescription:
    "Adres email jest już zarejestrowany już w systemie. Spróbuj zalogować się za pomoca innego dostawcy.",
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
    productList: "Lista Produktów",
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
  loadingError: "Błąd ładowania danych",
  productTabTrigger: "Produkt",
  nutritionalValueTabTrigger: "Wartość Odżywcza",
  producerTabTrigger: "Producent",
  ratingsTitle: "Cechy Produktu",
  productCharacteristicsDescription:
    "Cechy produktu, takie jak alergeny, posiadane certyfikaty, zastosowane procesy technologiczne, specjalne cechy produktu oraz informacje o braku określonych dodatków lub składników.",
  indexS: "Indeks Sumaryczny",
  indexT: "Indeks FFood",
};

const notFound = {
  title: "Nie znaleziono strony",
  description: "Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.",
  homeLink: "Wróć do strony głównej",
};

const productCard = {
  dropdown: {
    details: "Szczegóły Produktu",
    addToComparison: "Dodaj do porównania",
    replaceProduct: "Zastąp produkt: ",
    removeProduct: "Usuń produkt z porównania",
  },
  eanCode: "Kod EAN: {{ean}}",
};

const favouriteProducts = {
  title: "Lista Ulubionych Produktów",
  searchPlaceholder: "Szukaj ulubionych produktów...",
  searchButton: "Szukaj",
  clearFiltersButton: "Wyczyść filtry",
  pageIndicator: "Strona {{currentPage}} z {{totalPages}}",
  noProducts: "Brak dostępnych ulubionych produktów.",
  browseProducts: "Przejdź do Listy Produktów",
  breadcrumbs: {
    home: "Strona Główna",
    list: "Lista Ulubionych Produktów",
  },
};

const nutritionalChart = {
  title: "Podstawowe makroskładniki",
  description: "na 100 {{unit}} produktu.",
  energyUnit: "kcal",
  carbohydrates: "Węglowodany",
  fat: "Tłuszcz",
  fatName: "Total",
  protein: "Białko",
};

const fatSaturation = {
  title: "Tłuszcze",
  description: "na 100 {{unit}} produktu.",
  noFat: "Brak tłuszczu w produkcie",
  saturatedFatLabel: "Nasycone Kwasy Tłuszczowe",
  unsaturatedFatLabel: "Pozostałe Tłuszcze",
  chartLabel: "nasycone kwasy tłuszczowe / total tłuszcze",
  lowSaturatedFat: "Niska zawartość tłuszczów nasyconych",
  highSaturatedFat: "Wysoka zawartość tłuszczów nasyconych",
  moderateSaturatedFat: "Umiarkowana zawartość tłuszczów nasyconych",
};

const ingredients = {
  title: "Skład",
  noData: "Brak dostępnych danych dotyczących składników oraz dodatków.",
  ingredientsHeader: "Składniki",
  additionsHeader: "Numery Dodatków",
  description: "Lista składników i numerów dodatków użytych w tym produkcie.",
};

const allergens = {
  tooltip: "Alergen",
  sezam: "sezam",
  "mąka pszenna": "mąka pszenna",
  gorczyca: "gorczyca",
  migdały: "migdały",
  "orzeszki arachidowe": "orzeszki arachidowe",
  orzechy: "orzechy",
  "kasza jęczmienna": "kasza jęczmienna",
  mleko: "mleko",
  seler: "seler",
  jaja: "jaja",
  łubin: "łubin",
  gluten: "gluten",
  soja: "soja",
  kakao: "kakao",
  pszenica: "pszenica",
  "orzeszki ziemne": "orzeszki ziemne",
};

const sugarChart = {
  title: "Węglowodany",
  description: "na 100 {{unit}} produktu.",
  labels: {
    sugar: "Zawartość Cukru",
    nonSugarCarbs: "Pozostałe Węglowodany",
  },
  info: {
    lowSugar: "Niska zawartość cukru",
    moderateSugar: "Umiarkowana zawartość cukru",
    highSugar: "Wysoka zawartość cukru",
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
  userPreferences: "Preferencje Żywieniowe",
  clearComparison: "Usuń produkty z porównania",
  comparisonSection: "Porównanie produktów",
  slot1: "Produkt 1",
  slot2: "Produkt 2",
};

const userAuth = {
  settings: "Opcje\u00A0użytkownika",
  logout: "Wyloguj się",
  signIn: "Zaloguj się",
};

const productComparisonSlot = {
  noData: "Nie wybrano produktu",
  selectProduct: "Kliknij w symbol powyżej w celu wybrania produktu",
  browseProducts: "Wybierz produkt z listy",
  favoriteProducts: "Wybierz jeden z twoich ulubionych produktów",
  details: "Szczegóły produktu",
  removeProduct: "Usuń produkt z porównania",
};

const compare = {
  selectProducts: "Wybierz oba produkty, aby wyświetlić ich porównanie",
  homePage: "Strona Główna",
  comparePage: "Porównanie Produktów",
  title: "Porównanie Produktów",
  largerScreenInfo:
    "Rozważ użycie urządzenia z większym ekranem, aby uzyskać lepsze doświadczenie porównania.",
};

const sidebarComparisonSlot = {
  addProduct: "Dodaj produkt do porównania",
  browseProducts: "Wybierz produkt z listy",
  favoriteProducts: "Wybierz jeden z twoich ulubionych produktów",
  details: "Szczegóły Produktu",
  removeProduct: "Usuń produkt z porównania",
};

const macronutrientsInformation = {
  WartośćEnergetyczna: "Wartość energetyczna",
  Węglowodany: "Węglowodany",
  Tłuszcz: "Tłuszcz",
  Białko: "Białko",
  Sól: "Sól",
  Błonnik: "Błonnik",
  title: "Makroskładniki w produkcie",
  description:
    "W odniesieniu do Rekomendowanej Wartości Spożycia (RWS) dla osoby dorosłej na 100\u00A0{{unit}} produktu.",
  dataUnavailable: "Brak danych o makroskładnikach do wyświetlenia",
  macronutrient: "Makroskładnik",
  quantity: "Ilość",
  unit: "Jednostka",
  rwsPercentage: "%RWS",
};

const ratings = {
  "Bez laktozy": "Bez laktozy",
  "bez konserwantów": "Bez konserwantów",
  "mleko i produkty pochodne": "Mleko i produkty pochodne",
  pasteryzowanie: "Pasteryzowanie",
  "Bez dodatku cukru": "Bez dodatku cukru",
  "bez barwników": "Bez barwników",
  "orzeszki ziemne (arachidowe)": "Orzeszki ziemne (arachidowe)",
  "orzechy z drzew orzechowych": "Orzechy z drzew orzechowych",
  "sezam i produkty pochodne": "Sezam i produkty pochodne",
  siarczyny: "Siarczyny",
  "System „Jakość Tradycja”": "System „Jakość Tradycja”",
  "produkt naturalny": "Produkt naturalny",
  fermentacja: "Fermentacja",
  "Produkcja ekologiczna": "Produkcja ekologiczna",
  "Bez GMO": "Bez GMO",
  "Integrowana Produkcja Roślin (IP)": "Integrowana Produkcja Roślin (IP)",
  "Chronione Oznaczenie Geograficzne": "Chronione Oznaczenie Geograficzne",
  "Chroniona Nazwa Pochodzenia": "Chroniona Nazwa Pochodzenia",
  "Gwarantowana Tradycyjna Specjalność": "Gwarantowana Tradycyjna Specjalność",
  "QAFP System gwarantowanej jakości żywności":
    "QAFP System gwarantowanej jakości żywności",
  "QMP System gwarantowania jakości mięsa wołowego":
    "QMP System gwarantowania jakości mięsa wołowego",
  "V-Label (żywność wegańska i wegetariańska)":
    "V-Label (żywność wegańska i wegetariańska)",
  "Pork Quality System (PQS) -System Jakości Wieprzowiny":
    "Pork Quality System (PQS) -System Jakości Wieprzowiny",
  "Marine Stewardship Council (MSC) Certyfikat Zrównoważonego Rybołówstwa":
    "Marine Stewardship Council (MSC) Certyfikat Zrównoważonego Rybołówstwa",
  "Bez glutenu, Znak Przekreślonego Kłosa (ESL)":
    "Bez glutenu, Znak Przekreślonego Kłosa (ESL)",
  "Bez glutenu": "Bez glutenu",
  "O bardzo niskiej zawartości glutenu": "O bardzo niskiej zawartości glutenu",
  "Niska wartość energetyczna": "Niska wartość energetyczna",
  "Niska zawartość tłuszczu": "Niska zawartość tłuszczu",
  "Nie zawiera tłuszczu": "Nie zawiera tłuszczu",
  "Bez tłuszczów nasyconych": "Bez tłuszczów nasyconych",
  "Niska zawartość cukrów": "Niska zawartość cukrów",
  "Bez mleka krowiego i produktów pochodnych":
    "Bez mleka krowiego i produktów pochodnych",
  "Bez Beta Kazeiny A1": "Bez Beta Kazeiny A1",
  "O bardzo niskiej zawartości laktozy": "O bardzo niskiej zawartości laktozy",
  "Wegański (bez produktów zwierzęcych)":
    "Wegański (bez produktów zwierzęcych)",
  Wegetariański: "Wegetariański",
  "Bez soli": "Bez soli",
  "Niska zawartość sodu/soli": "Niska zawartość sodu/soli",
  "bez przeciwutleniaczy": "Bez przeciwutleniaczy",
  "bez emulgatorów i środków spulchniających":
    "Bez emulgatorów i środków spulchniających",
  "bez wzmacniaczy smaku": "Bez wzmacniaczy smaku",
  "bez azotynów i azotanów": "Bez azotynów i azotanów",
  "bez środków słodzących": "Bez środków słodzących",
  "bez dodatków do żywności": "Bez dodatków do żywności",
  "bez zagęstników": "Bez zagęstników",
  "bez aromatów": "Bez aromatów",
  "skorupiaki i produkty pochodne": "Skorupiaki i produkty pochodne",
  "jaja i produkty pochodne": "Jaja i produkty pochodne",
  "ryby i produkty pochodne": "Ryby i produkty pochodne",
  "soja i produkty pochodne": "Soja i produkty pochodne",
  "seler i produkty pochodne": "Seler i produkty pochodne",
  "gorczyca i produkty pochodne": "Gorczyca i produkty pochodne",
  "łubin i produkty pochodne": "Łubin i produkty pochodne",
  "mięczaki i produkty pochodne": "Mięczaki i produkty pochodne",
  "produkt o dedykowanej strukturze dla osób starszych":
    "Produkt o dedykowanej strukturze dla osób starszych",
  "produkt o dedykowanej strukturze dla dzieci":
    "Produkt o dedykowanej strukturze dla dzieci",
  "produkt o dedykowanej strukturze dla diety łatwostrawnej":
    "Produkt o dedykowanej strukturze dla diety łatwostrawnej",
  "Produkt o dedykowanej strukturze dla kobiet w ciąży i karmiących":
    "Produkt o dedykowanej strukturze dla kobiet w ciąży i karmiących",
  "produkt o dedykowanej strukturze dla sportowców":
    "Produkt o dedykowanej strukturze dla sportowców",
  "produkt o dedykowanej strukturze dla diety wysokobłonnikowej":
    "Produkt o dedykowanej strukturze dla diety wysokobłonnikowej",
  "produkt o niskim Indeksie Glikemicznym":
    "Produkt o niskim Indeksie Glikemicznym",
  mrożenie: "Mrożenie",
  "głębokie mrożenie": "Głębokie mrożenie",
  gotowanie: "Gotowanie",
  "gotowanie na parze": "Gotowanie na parze",
  sterylizowanie: "Sterylizowanie",
  smażenie: "Smażenie",
  "smażenie beztłuszczowe": "Smażenie beztłuszczowe",
  liofilizowanie: "Liofilizowanie",
  peklowanie: "Peklowanie",
  "ekstrakcja na zimno": "Ekstrakcja na zimno",
  "ekstrakcja rozp. selektywnymi": "Ekstrakcja rozp. selektywnymi",
  rafinowanie: "Rafinowanie",
  "utwardzanie tłuszczów": "Utwardzanie tłuszczów",
  "estryfikacja tłuszczów": "Estryfikacja tłuszczów",
  neutralizacja: "Neutralizacja",
  napromieniowanie: "Napromieniowanie",
  ekspandowanie: "Ekspandowanie",
  ekstruzja: "Ekstruzja",
  "wędzenie na zimno": "Wędzenie na zimno",
  "wędzenie na gorąco": "Wędzenie na gorąco",
  paskalizacja: "Paskalizacja",
  suszenie: "Suszenie",
  inne: "Inne",
  "wysoka zawartość białka": "Wysoka zawartość białka",
  "wysoka zawartość wapnia": "Wysoka zawartość wapnia",
  "Zastosowane procesy technologiczne": "Zastosowane procesy technologiczne",
  "Alergeny (może zawierać)": "Alergeny (może zawierać)",
  "Parametry bez składników": "Parametry bez składników",
  "Specyficzne Cechy": "Specyficzne Cechy",
  "Posiadane Certyfikaty": "Posiadane Certyfikaty",
  "Alegreny (może zawierać)": "Alegreny (może zawierać)",
  "Bez dodatków do żywności": "Bez dodatków do żywności",
};

const omega3 = {
  ALA: "Omega-3 ALA",
  "EPA+DHA": "Omega-3 EPA+DHA",
};

const omega3Information = {
  title: "Zawartość Omega-3 w produkcie",
  description:
    "W odniesieniu do Rekomendowanej Wartości Spożycia (RWS) dla osoby dorosłej na 100 {{unit}} produktu.",
  dataUnavailable: "Brak danych o Omega-3 do wyświetlenia",
  table: {
    name: "Omega-3",
    quantity: "Ilość",
    unit: "Jednostka",
    rwsPercentage: "% RWS",
  },
};

const packageTypes = {
  "tacka z tworzywa sztucznego przykryta folią typu  otwórz/zamknij":
    "tacka z tworzywa sztucznego przykryta folią typu otwórz/zamknij",
  "torebka folia": "torebka folia",
  butelka: "butelka",
  "butelka HDPE": "butelka HDPE",
  folia: "folia",
  "pergamin + folia": "pergamin + folia",
  "tacka, pakowano w atmosferze ochronnej":
    "tacka, pakowano w atmosferze ochronnej",
  pergamin: "pergamin",
  tacka: "tacka",
  "kubek PP": "kubek PP",
  "folia karton": "folia karton",
  Kubek: "Kubek",
  "tacka, pakowany w atmosferze ochronnej":
    "tacka, pakowany w atmosferze ochronnej",
  "folia PET": "folia PET",
  "butelka PET": "butelka PET",
  PET: "PET",
  "wiaderko PP": "wiaderko PP",
  "szklana butelka": "szklana butelka",
  słoik: "słoik",
  "pojemnik PET": "pojemnik PET",
  "torebka foliowa": "torebka foliowa",
  "folia PAPE, pakowany próżniowo": "folia PAPE, pakowany próżniowo",
  TetraPak: "TetraPak",
  "pojemnik PP": "pojemnik PP",
  "torba folia": "torba folia",
  "butelka szklana": "butelka szklana",
  "kubek PS": "kubek PS",
  "Tetra Pak": "Tetra Pak",
  "folia, karton": "folia, karton",
  torebka: "torebka",
  "tacka biodegradowalna": "tacka biodegradowalna",
  karton: "karton",
  "Woreczek papierowy, strunowy": "Woreczek papierowy, strunowy",
  foila: "foila",
  "butelka PP": "butelka PP",
  "blister foliowy, torebka foliowo papierowa":
    "blister foliowy, torebka foliowo papierowa",
  "kubełek PP": "kubełek PP",
};

const userPreference = {
  title: "Preferencje Żywieniowe",
  description: `Wprowadź swoje preferencje żywieniowe w kategorii "{{category}}" lub wybierz inną interesującą cię kategorię preferencji.`,
  breadcrumbs: {
    home: "Strona Główna",
    userPreference: "Preferencje Żywieniowe",
  },
  saveButton: "Zapisz zmiany",
  allergens: "Alergeny",
  macronutrients: "Makroskładniki",
  nutrients: "Składniki odżywcze",
  vitamins: "witaminy",
  minerals: "minerały",
  omega3: "Omega-3",
  appliedTechnologicalProcesses: "Zastosowane procesy technologiczne",
  parametersWithoutIngredients: "Parametry bez składników",
  withoutFoodAdditives: "Bez dodatków do żywności",
  certificatesHeld: "Posiadane certyfikaty",
  packageTypes: "Typ opakowania",
  specificFeatures: "Specyficzne cechy",
  dialog: {
    title: "Czy na pewno chcesz zapisać zmiany?",
    description:
      "Po zapisaniu, zmiany zostaną utrwalone w twoich preferencjach żywieniowych.",
    confirm: "Potwierdź",
  },
  resetPreferences: "Wyczyść preferencje",
};

const editUserPreference = {
  successTitle: "Zapisano preferencje żywieniowe",
  successDescription: "Zapisano nowe preferencje żywieniowe użytkownika.",
  errorTitle: "Wystąpił błąd przy zapisie preferencji żywieniowych",
};

const favoriteComparison = {
  more: "Produkt jest bardziej popularny wśród naszych użytkowników",
  less: "Produkt jest mniej popularny wśród naszych użytkowników",
};

const productComparison = {
  basicInfo: "Podstawowe Informacje",
  macronutrients: "Makroskładniki",
  nutrients: "Składniki odżywcze",
  productDescription: "Opis produktu:",
  ean: "Kod EAN:",
  countryOfOrigin: "Kraj pochodzenia:",
  packageType: "Typ Opakowania:",
  productCharacteristicsTitle: "Cechy Produktu",
  productCharacteristicsDescription:
    "Cechy produktu, takie jak alergeny, posiadane certyfikaty, zastosowane procesy technologiczne, specjalne cechy produktu oraz informacje o braku określonych dodatków lub składników.",
  nutrientsComparisonTitle: "Składniki Odżywcze",
  nutrientsComparisonDescription:
    "Składniki odżywcze występujące w porównywanych produktach, z uwzględnieniem Twoich preferencji żywieniowych.",
};

const packageTypeComparison = {
  negative: "Niezgodny z preferencjami typ opakowania",
  positive: "Zgodny z preferencjami typ opakowania",
};

const macronutrientsComparison = {
  title: "Makroskładniki w produktach",
  description:
    "Różnica musi być większa niż 5% RWS (Referencyjnej Wartości Spożycia) dla osoby dorosłej na 100g produktu, aby została oceniona.",
  descriptionWithUserPreferece:
    "Na podstawie Twoich preferencji żywieniowych. Różnica musi być większa niż 5% RWS (Referencyjnej Wartości Spożycia) dla osoby dorosłej na 100g produktu, aby została oceniona.",
};

const nutrientComparison = {
  noNutrients:
    "Brak składników odżywczych pasujących do Twojego profilu dietetycznego.",
};

const homePage = {
  breadcrumbs: {
    home: "Strona Głowna",
  },
  title: "Strona Główna",
  popularItems: "Najpopularniejsze Produkty",
  descriptionOfFunctionality:
    "Wybierz produkty certyfikowane znakiem F-Food z listy, następnie przejdź do ich porównania.",
  productList: "Lista Produktów",
  compareProducts: "Porównaj Produkty",
  knowMore:
    "Więcej informacji na temat produktów z katalogu F-Food znajdziesz poniżej.",
  FFoodLink: "F-Food",
};

export default {
  homePage,
  nutrientComparison,
  macronutrientsComparison,
  packageTypeComparison,
  productComparison,
  favoriteComparison,
  editUserPreference,
  userPreference,
  packageTypes,
  omega3Information,
  omega3,
  ratings,
  macronutrientsInformation,
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
