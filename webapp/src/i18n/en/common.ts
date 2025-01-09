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
} satisfies {
  [key in ExceptionCode]: string;
};

const mineralsInformation = {
  title: "Mineral Content in the Product",
  description: "In reference to the Dietary Reference Value for an adult per 100 {{unit}} of the product",
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
  description: "In reference to the Dietary Reference Value for an adult per 100 {{unit}} of the product",
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
  unauthorizedDescription: "Unauthorized access for this action",
};

const sessionExpiredDialog = {
  title: "Session expired",
  description: "Sign in or continue with basic functionality",
  signOut: "Continue without signing in again",
};

const authGuard = {
  noAccess: "No access",
  noAccessDescription: "No access to this resource",
};

const login = {
  accountCreated: "Account created successfully",
  accountCreatedDescription:
    "Your account has been created, and you're now logged in.",
  loggedIn: "Logged in successfully",
  loggedInDescription: "You have been logged in successfully.",
  loginError: "Login error",
  tryAgain: "An error occurred during login. Please try again.",
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
    productList: "Product List"
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
};
const notFound = {
  title: "Page not found",
  description: "Sorry, we couldn't find the page you were looking for.",
  homeLink: "Return to Home"
};

const productCard = {
  dropdown: {
    details: "Product Details",
    addToComparison: "Add to comparison",
    replaceProduct: "Replace product: ",
    removeProduct: "Remove product from comparison"
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
  description: "per 100 {{unit}} of the product",
  energyUnit: "kcal",
  carbohydrates: "Carbohydrates",
  fat: "Fat",
  protein: "Protein",
};

const fatSaturation = {
  title: "Fats",
  description: "per 100 {{unit}} of the product",
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
};

const allergens = {
  title: "Allergens",
  noData: "No allergens present",
};

const sugarChart = {
  title: "Carbohydrates",
  description: "per 100 {{unit}} of the product",
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
  editPreferences: "Edit Nutritional Preferences",
  clearComparison: "Clear comparison products",
  comparisonSection: "Product comparison",
  slot1: "Product 1",
  slot2: "Product 2",
};

const userAuth = {
  settings: "User\u00A0options",
  logout: "Sign out",
  signIn: "Sign in",
}

const productComparisonSlot = {
  noData: "No product selected",
  selectProduct: "Click the symbol above to select a product",
  browseProducts: "Choose a product from the list",
  favoriteProducts: "Choose a product from your favorite products",
  details: "Product details",
  removeProduct: "Remove product from comparison",
}

const compare = {
  selectProducts: "Select both products to display their comparison",
  homePage: "Home",
  comparePage: "Product Comparison",
  title: "Product Comparison",
}

const sidebarComparisonSlot = {
  addProduct: "Add product to comparison",
  browseProducts: "Choose a product from the list",
  favoriteProducts: "Choose a product from your favorite products",
  details: "Product Details",
  removeProduct: "Remove product from comparison",
}

const macronutrientsInformation = {
  WartośćEnergetyczna: "Energy value",
  Węglowodany: "Carbohydrates",
  Tłuszcz: "Fats",
  Białko: "Protein",
  Sól: "Salt",
  Błonnik: "Fibers",
  title: "Macronutrients in product",
  description: "In reference to the Dietary Reference Value for an adult per 100 {{unit}} of the product",
  dataUnavailable: "No macronutrient data available to display",
  macronutrient: "Macronutrient",
  quantity: "Quantity",
  unit: "Unit",
  rwsPercentage: "% DRV",
}

export default {
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
