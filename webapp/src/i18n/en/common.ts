import { ExceptionCode } from "@/types/ErrorCode";

const validation = {
  characters: "character(s)",
  minLength: "Field must contain at least",
  maxLength: "Field must contain at most",
};

const error = {
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
  mineralDrvChart: {
    title: "Mineral Content in the Product",
    description: "In reference to the Dietary Reference Value for an adult",
  },
  mineralDataUnavailable: "No mineral data available to display.",
  mineralNutritionalValues: {
    title: "Mineral Content in the Product",
    description: "In reference to the Dietary Reference Value for an adult",
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
  vitaminDrvChart: {
    title: "Vitamin Content in the Product",
    description: "Percentage of Dietary Reference Value for an adult",
  },
  vitaminDataUnavailable: "No vitamin data available to display.",
  vitaminNutritionalValues: {
    title: "Vitamin Content in the Product",
    description: "Percentage of Dietary Reference Value for an adult",
    table: {
      vitamin: "Vitamin",
      quantity: "Quantity",
      unit: "Unit",
      rwsPercentage: "% DRV",
    },
  },
  vitaminFooter: {
    dataSource: "Data based on product nutritional values.",
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

export default {
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
