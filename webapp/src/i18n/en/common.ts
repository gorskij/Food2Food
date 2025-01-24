import { ExceptionCode } from "@/types/ErrorCode";

const validation = {
  characters: "character(s)",
  minLength: "Field must contain at least",
  maxLength: "Field must contain at most",
};

const error = {
  loadingError: "An error occurred while loading data.",
  baseTitle: "Error occurred",
  baseDescription: "Something went wrong...",
  userBlocked: "Your account is blocked",
  internalServerErrorDescription:
    "Oops! Something went wrong on our end. Please try again later.",
};

const errors = {
  optimisticLock: "You are not working on the latest data",
  registrationError: "Error while registering",
  invalidData: "Invalid data",
  notFound: "Not found",
  userNotFound: "User not found",
  themeNotFound: "Theme not found",
  productNotFound: "Product not found",
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
  unknownError: "Something went wrong...",
} satisfies {
  [key in ExceptionCode]: string;
};

const mineralsInformation = {
  title: "Mineral Content in the Product",
  description:
    "In reference to the Dietary Reference Value (DRV) for an adult per 100 {{unit}} of the product.",
  mineralDataUnavailable: "No mineral data available to display",
  mineralNutritionalValues: {
    table: {
      mineral: "Mineral",
      quantity: "Quantity",
      unit: "Unit",
      rwsPercentage: "% DRV",
    },
  },
};

const RWSChart = {
  rws: "100% DRV",
};
const minerals = {
  Potas: "Potassium",
  Wapń: "Calcium",
  Fosfor: "Phosphorus",
  Magnez: "Magnesium",
  Żelazo: "Iron",
  Cynk: "Zinc",
  Fluorek: "Fluoride",
  Mangan: "Manganese",
  Miedź: "Copper",
  Jod: "Iodine",
  Selen: "Selenium",
  Molibden: "Molybdenum",
  Chrom: "Chromium",
};
const base = {
  noData: "N/A",
};

const vitaminsInformation = {
  title: "Vitamin Content in the Product",
  description:
    "In reference to the Dietary Reference Value for an adult per 100 {{unit}} of the product.",
  vitaminDataUnavailable: "No vitamin data available to display",
  vitaminNutritionalValues: {
    table: {
      vitamin: "Vitamin",
      quantity: "Quantity",
      unit: "Unit",
      rwsPercentage: "% DRV",
    },
  },
};

const vitamins = {
  "Witamina A": "Vitamin A",
  "Witamina B1": "Vitamin B1",
  "Witamina B2": "Vitamin B2",
  "Witamina B3": "Vitamin B3",
  "Witamina B5": "Vitamin B5",
  "Witamina B6": "Vitamin B6",
  "Witamina B7": "Vitamin B7",
  "Witamina B9": "Vitamin B9",
  "Witamina B12": "Vitamin B12",
  "Witamina C": "Vitamin C",
  "Witamina D": "Vitamin D",
  "Witamina E": "Vitamin E",
  "Witamina K": "Vitamin K",
};

const loginButton = {
  googleLoginButton: "Sign in using Google",
  githubLoginButton: "Sign in using GitHub",
};

const axiosPrivate = {
  unauthorized: "Unauthorized access",
  unauthorizedDescription: "Unauthorized access for this action.",
};

const sessionExpiredDialog = {
  title: "Session expired",
  description: "Sign in or continue with basic functionality",
  signOut: "Continue without signing in again.",
};

const authGuard = {
  noAccess: "No access",
  noAccessDescription: "No access to this resource.",
};

const login = {
  accountCreated: "Account created successfully",
  accountCreatedDescription:
    "Your account has been created, and you're now logged in.",
  loggedIn: "Logged in successfully",
  loggedInDescription: "You have been logged in successfully.",
  loginError: "Login error",
  tryAgain: "An error occurred during login. Please try again.",
  creationError: "Registration error",
  creationErrorDescription:
    "An error occurred during registration. Please try again.",
  emailConflict: "Email conflict",
  emailConflictDescription:
    "The email address is already registered in the system. Please try logging in using a different provider.",
};

const logout = {
  successTitle: "Logged out",
  successDescription: "You have been successfully logged out.",
};

const addFavoriteProduct = {
  successTitle: "Added to Favorites",
  successDescription: "The product has been added to your favorites.",
  error: "Failed to add to favorites",
};

const removeFavoriteProduct = {
  successTitle: "Removed from Favorites",
  successDescription: "The product has been removed from your favorites.",
  error: "Failed to remove from favorites",
};

const favoriteInfo = {
  productInFavorites: "Product is in your favorites!",
  addToFavorites: "Add to favorites!",
  countFavorites: "{{count}} users have added this product to their favorites.",
};

const productsPage = {
  title: "Product List",
  searchPlaceholder: "Search products...",
  searchButton: "Search",
  clearFiltersButton: "Clear filters",
  pageIndicator: "Page {{currentPage}} of {{totalPages}}",
  noProducts: "No available products.",
  breadcrumbs: {
    home: "Home",
    list: "Product List",
  },
};

const productDetails = {
  title: "Product Details",
  breadcrumbs: {
    home: "Home",
    productList: "Product List",
  },
  noData: "No data available",
  description: "Description",
  eanCode: "EAN Code",
  quantity: "Quantity",
  countryOfOrigin: "Country of Origin",
  packageType: "Package Type",
  addToCompare: "Add to Compare",
  producerInfo: "Producer Information",
  producer: "Producer",
  address: "Address",
  nip: "NIP",
  contact: "Contact",
  nutritionalValue: "Nutritional Value",
  basic: "Basic",
  vitaminsAndMinerals: "Vitamins and Minerals",
  omega3: "Omega 3",
  additional: "Additional",
  loadingError: "Error loading data",
  productTabTrigger: "Product",
  nutritionalValueTabTrigger: "Nutritional Value",
  producerTabTrigger: "Producer",
  ratingsTitle: "Product Characteristics",
  productCharacteristicsDescription:
    "Product characteristics, such as allergens, certifications, applied technological processes, unique product features, and information about the absence of specific additives or ingredients.",
};
const notFound = {
  title: "Page not found",
  description: "Sorry, we couldn't find the page you were looking for.",
  homeLink: "Return to Home",
};

const productCard = {
  dropdown: {
    details: "Product Details",
    addToComparison: "Add to comparison",
    replaceProduct: "Replace product: ",
    removeProduct: "Remove product from comparison",
  },
  eanCode: "EAN Code: {{ean}}",
};

const favouriteProducts = {
  title: "Favourite Products List",
  searchPlaceholder: "Search favourite products...",
  searchButton: "Search",
  clearFiltersButton: "Clear filters",
  pageIndicator: "Page {{currentPage}} of {{totalPages}}",
  noProducts: "No favourite products available.",
  breadcrumbs: {
    home: "Home",
    list: "Favourite Products List",
  },
};

const nutritionalChart = {
  title: "Basic Macronutrients",
  description: "per 100 {{unit}} of the product.",
  energyUnit: "kcal",
  carbohydrates: "Carbohydrates",
  fat: "Fat",
  protein: "Protein",
};

const fatSaturation = {
  title: "Fats",
  description: "per 100 {{unit}} of the product.",
  noFat: "No fat in the product",
  saturatedFatLabel: "Saturated Fatty Acids",
  unsaturatedFatLabel: "Unsaturated Fats",
  saturated: "Saturated Fatty Acids",
  chartLabel: "saturated fatty acids / total fats",
  lowSaturatedFat: "Low saturated fat content",
  highSaturatedFat: "High saturated fat content",
  moderateSaturatedFat: "Moderate saturated fat content",
};

const ingredients = {
  title: "Composition",
  noData: "No data available about ingredients and additions.",
  ingredientsHeader: "Ingredients",
  additionsHeader: "Additive Numbers",
  description:
    "A detailed breakdown of the ingredients and additive numbers used in this product.",
};

const allergens = {
  tooltip: "Allergen",
  sezam: "sesame",
  "mąka pszenna": "wheat flour",
  gorczyca: "mustard",
  migdały: "almonds",
  "orzeszki arachidowe": "peanuts",
  orzechy: "nuts",
  "kasza jęczmienna": "barley groats",
  mleko: "milk",
  seler: "celery",
  jaja: "eggs",
  łubin: "lupin",
  gluten: "gluten",
  soja: "soy",
  kakao: "cocoa",
  pszenica: "wheat",
  "orzeszki ziemne": "peanuts",
};

const sugarChart = {
  title: "Carbohydrates",
  description: "per 100 {{unit}} of the product.",
  labels: {
    sugar: "Sugar Content",
    nonSugarCarbs: "Other Carbohydrates",
  },
  info: {
    lowSugar: "Low sugar content",
    moderateSugar: "Moderate sugar content",
    highSugar: "High sugar content",
  },
  noCarbs: "No carbohydrates in the product",
  tooltip: "sugar / total carbohydrates",
};

const appSidebar = {
  home: "Home",
  productList: "Product List",
  compareProducts: "Compare Products",
  yourSection: "Your Section",
  favorites: "Favorite Products",
  userPreferences: "Dietary Preferences",
  clearComparison: "Clear comparison products",
  comparisonSection: "Product comparison",
  slot1: "Product 1",
  slot2: "Product 2",
};

const userAuth = {
  settings: "User\u00A0options",
  logout: "Sign out",
  signIn: "Sign in",
};

const productComparisonSlot = {
  noData: "No product selected",
  selectProduct: "Click the symbol above to select a product",
  browseProducts: "Choose a product from the list",
  favoriteProducts: "Choose a product from your favorite products",
  details: "Product details",
  removeProduct: "Remove product from comparison",
};

const compare = {
  selectProducts: "Select both products to display their comparison",
  homePage: "Home",
  comparePage: "Product Comparison",
  title: "Product Comparison",
  largerScreenInfo:
    "Consider using a device with a larger screen for a better comparison experience.",
};

const sidebarComparisonSlot = {
  addProduct: "Add product to comparison",
  browseProducts: "Choose a product from the list",
  favoriteProducts: "Choose a product from your favorite products",
  details: "Product Details",
  removeProduct: "Remove product from comparison",
};

const macronutrientsInformation = {
  WartośćEnergetyczna: "Energy value",
  Węglowodany: "Carbohydrates",
  Tłuszcz: "Fats",
  Białko: "Protein",
  Sól: "Salt",
  Błonnik: "Fibers",
  title: "Macronutrients in product",
  description:
    "In reference to the Dietary Reference Value (DRV) for an adult per 100 {{unit}} of the product.",
  dataUnavailable: "No macronutrient data available to display",
  macronutrient: "Macronutrient",
  quantity: "Quantity",
  unit: "Unit",
  rwsPercentage: "% DRV",
};

const ratings = {
  "Bez laktozy": "Lactose Free",
  "bez konserwantów": "Preservative Free",
  "mleko i produkty pochodne": "Milk and Derivatives",
  pasteryzowanie: "Pasteurized",
  "Bez dodatku cukru": "Sugar Free",
  "bez barwników": "Colorant Free",
  "orzeszki ziemne (arachidowe)": "Peanuts",
  "orzechy z drzew orzechowych": "Tree Nuts",
  "sezam i produkty pochodne": "Sesame and Derivatives",
  siarczyny: "Sulphites",
  "System „Jakość Tradycja”": "Quality Tradition System",
  "produkt naturalny": "Natural Product",
  fermentacja: "Fermentation",
  "Produkcja ekologiczna": "Organic Production",
  "Bez GMO": "GMO Free",
  "Integrowana Produkcja Roślin (IP)": "Integrated Plant Production",
  "Chronione Oznaczenie Geograficzne": "Protected Geographical Indication",
  "Chroniona Nazwa Pochodzenia": "Protected Designation of Origin",
  "Gwarantowana Tradycyjna Specjalność": "Guaranteed Traditional Specialty",
  "QAFP System gwarantowanej jakości żywności": "QAFP Quality System",
  "QMP System gwarantowania jakości mięsa wołowego": "QMP Beef Quality System",
  "V-Label (żywność wegańska i wegetariańska)":
    "V-Label (Vegan and Vegetarian Food)",
  "Pork Quality System (PQS) -System Jakości Wieprzowiny":
    "Pork Quality System (PQS)",
  "Marine Stewardship Council (MSC) Certyfikat Zrównoważonego Rybołówstwa":
    "Marine Stewardship Council (MSC) Sustainable Fishing Certificate",
  "Bez glutenu, Znak Przekreślonego Kłosa (ESL)": "Gluten Free",
  "Bez glutenu": "Gluten Free",
  "O bardzo niskiej zawartości glutenu": "Very Low Gluten",
  "Niska wartość energetyczna": "Low Energy Value",
  "Niska zawartość tłuszczu": "Low Fat",
  "Nie zawiera tłuszczu": "Fat Free",
  "Bez tłuszczów nasyconych": "Saturated Fat Free",
  "Niska zawartość cukrów": "Low Sugar Content",
  "Bez mleka krowiego i produktów pochodnych": "Cow Milk Free",
  "Bez Beta Kazeiny A1": "A1 Beta Casein Free",
  "O bardzo niskiej zawartości laktozy": "Very Low Lactose",
  "Wegański (bez produktów zwierzęcych)": "Vegan (Animal Product Free)",
  Wegetariański: "Vegetarian",
  "Bez soli": "Salt Free",
  "Niska zawartość sodu/soli": "Low Sodium/Salt",
  "bez przeciwutleniaczy": "Antioxidant Free",
  "bez emulgatorów i środków spulchniających":
    "Emulsifier and Raising Agent Free",
  "bez wzmacniaczy smaku": "Flavor Enhancer Free",
  "bez azotynów i azotanów": "Nitrite and Nitrate Free",
  "bez środków słodzących": "Sweetener Free",
  "bez dodatków do żywności": "Food Additive Free",
  "bez zagęstników": "Thickener Free",
  "bez aromatów": "Flavoring Free",
  "skorupiaki i produkty pochodne": "Shellfish and Derivatives",
  "jaja i produkty pochodne": "Eggs and Derivatives",
  "ryby i produkty pochodne": "Fish and Derivatives",
  "soja i produkty pochodne": "Soy and Derivatives",
  "seler i produkty pochodne": "Celery and Derivatives",
  "gorczyca i produkty pochodne": "Mustard and Derivatives",
  "łubin i produkty pochodne": "Lupin and Derivatives",
  "mięczaki i produkty pochodne": "Molluscs and Derivatives",
  "produkt o dedykowanej strukturze dla osób starszych": "Product for Seniors",
  "produkt o dedykowanej strukturze dla dzieci": "Product for Children",
  "produkt o dedykowanej strukturze dla diety łatwostrawnej":
    "Product for Easy-to-Digest Diet",
  "Produkt o dedykowanej strukturze dla kobiet w ciąży i karmiących":
    "Product for Pregnant and Nursing Women",
  "produkt o dedykowanej strukturze dla sportowców": "Product for Athletes",
  "produkt o dedykowanej strukturze dla diety wysokobłonnikowej":
    "Product for High-Fiber Diet",
  "produkt o niskim Indeksie Glikemicznym": "Low Glycemic Index Product",
  mrożenie: "Freezing",
  "głębokie mrożenie": "Deep Freezing",
  gotowanie: "Cooking",
  "gotowanie na parze": "Steaming",
  sterylizowanie: "Sterilizing",
  smażenie: "Frying",
  "smażenie beztłuszczowe": "Fat-Free Frying",
  liofilizowanie: "Freeze Drying",
  peklowanie: "Curing",
  "ekstrakcja na zimno": "Cold Extraction",
  "ekstrakcja rozp. selektywnymi": "Selective Solvent Extraction",
  rafinowanie: "Refining",
  "utwardzanie tłuszczów": "Fat Hardening",
  "estryfikacja tłuszczów": "Fat Esterification",
  neutralizacja: "Neutralization",
  napromieniowanie: "Irradiation",
  ekspandowanie: "Expanding",
  ekstruzja: "Extrusion",
  "wędzenie na zimno": "Cold Smoking",
  "wędzenie na gorąco": "Hot Smoking",
  paskalizacja: "Pascualization",
  suszenie: "Drying",
  inne: "Other",
  "wysoka zawartość białka": "High Protein Content",
  "wysoka zawartość wapnia": "High Calcium Content",
  "Zastosowane procesy technologiczne": "Applied technological processes",
  "Alergeny (może zawierać)": "Allergens (may contain)",
  "Parametry bez składników": "Parameters without ingredients",
  "Specyficzne Cechy": "Specific features",
  "Posiadane Certyfikaty": "Certificates held",
  "Alegreny (może zawierać)": "Allergens (may contain)",
  "Bez dodatków do żywności": "Without food additives",
};

const omega3 = {
  ALA: "Omega-3 ALA",
  "EPA+DHA": "Omega-3 EPA+DHA",
};

const omega3Information = {
  title: "Omega-3 Content in the Product",
  description:
    "In reference to the Dietary Reference Value (DRV) for an adult per 100 {{unit}} of the product.",
  dataUnavailable: "No Omega-3 data available to display",
  table: {
    name: "Omega-3",
    quantity: "Quantity",
    unit: "Unit",
    rwsPercentage: "% DRV",
  },
};

const packageTypes = {
  "tacka z tworzywa sztucznego przykryta folią typu  otwórz/zamknij":
    "plastic tray covered with open/close film",
  "torebka folia": "foil bag",
  butelka: "bottle",
  "butelka HDPE": "HDPE bottle",
  folia: "film",
  "pergamin + folia": "parchment + film",
  "tacka, pakowano w atmosferze ochronnej":
    "tray, packed in protective atmosphere",
  pergamin: "parchment",
  tacka: "tray",
  "kubek PP": "PP cup",
  "folia karton": "film carton",
  Kubek: "Cup",
  "tacka, pakowany w atmosferze ochronnej":
    "tray, packed in protective atmosphere",
  "folia PET": "PET film",
  "butelka PET": "PET bottle",
  PET: "PET",
  "wiaderko PP": "PP bucket",
  "szklana butelka": "glass bottle",
  słoik: "jar",
  "pojemnik PET": "PET container",
  "torebka foliowa": "plastic bag",
  "folia PAPE, pakowany próżniowo": "PAPE film, vacuum packed",
  TetraPak: "Tetra Pak",
  "pojemnik PP": "PP container",
  "torba folia": "plastic bag",
  "butelka szklana": "glass bottle",
  "kubek PS": "PS cup",
  "Tetra Pak": "Tetra Pak",
  "folia, karton": "film, carton",
  torebka: "bag",
  "tacka biodegradowalna": "biodegradable tray",
  karton: "carton",
  "Woreczek papierowy, strunowy": "paper zip-lock bag",
  foila: "film",
  "butelka PP": "PP bottle",
  "blister foliowy, torebka foliowo papierowa": "foil blister, foil-paper bag",
  "kubełek PP": "PP bucket",
};

const userPreference = {
  title: "Dietary Preferences",
  description: `Enter your dietary preferences in the "{{category}}" category or choose another category of interest to you.`,
  breadcrumbs: {
    home: "Home Page",
    userPreference: "Dietary Preferences",
  },
  saveButton: "Save Changes",
  allergens: "Allergens",
  macronutrients: "Macronutrients",
  nutrients: "Nutrients",
  vitamins: "Vitamins",
  minerals: "Minerals",
  omega3: "Omega-3",
  appliedTechnologicalProcesses: "Applied Technological Processes",
  parametersWithoutIngredients: "Parameters Without Ingredients",
  withoutFoodAdditives: "Without Food Additives",
  certificatesHeld: "Held Certificates",
  packageTypes: "Package Types",
  specificFeatures: "Specific Features",
  dialog: {
    title: "Are you sure you want to save the changes?",
    description:
      "Once saved, the changes will be applied to your dietary preferences.",
    confirm: "Confirm",
  },
  resetPreferences: "Reset preferences",
};

const editUserPreference = {
  successTitle: "Dietary Preferences Saved",
  successDescription: "The user's new dietary preferences have been saved.",
  errorTitle: "An error occurred while saving dietary preferences",
};

const favoriteComparison = {
  more: "Product is more popular with our users",
  less: "Product is less popular with our users",
};

const packageTypeComparison = {
  negative: "Package type inconsistent with preferences",
  positive: "Package type consistent with preferences",
};

const productComparison = {
  basicInfo: "Basic Information",
  macronutrients: "Macronutrients",
  nutrients: "Nutrients",
  productDescription: "Product Description:",
  ean: "EAN Code:",
  countryOfOrigin: "Country of Origin:",
  packageType: "Package Type:",
  productCharacteristicsTitle: "Product Characteristics",
  productCharacteristicsDescription:
    "Product characteristics, such as allergens, certifications, applied technological processes, unique product features, and information about the absence of specific additives or ingredients.",
  nutrientsComparisonTitle: "Nutrients",
  nutrientsComparisonDescription:
    "Nutrients present in the compared products, taking into account your dietary preferences.",
};

const macronutrientsComparison = {
  title: "Macronutrients in products",
  description:
    "The difference must be larger then 5% of Dietary Reference Value (DRV) for an adult per 100g of the product to be evaluated.",
};

const nutrientComparison = {
  noNutrients: "No nutrient matching your diatary profile.",
};

export default {
  nutrientComparison,
  macronutrientsComparison,
  productComparison,
  packageTypeComparison,
  favoriteComparison,
  editUserPreference,
  userPreference,
  packageTypes,
  omega3Information,
  omega3,
  ratings,
  macronutrientsInformation,
  sidebarComparisonSlot,
  productComparisonSlot,
  compare,
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
  vitamins,
  vitaminsInformation,
  base,
  errors,
  minerals,
  validation,
  mineralsInformation,
  RWSChart,
} as const;
