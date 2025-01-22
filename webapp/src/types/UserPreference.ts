import { Allergen } from "./Allergen";
import { NutritionalValueName } from "./NutritionalValueName";
import { PackageType } from "./PackageType";
import { Rating } from "./Rating";

export type UserPreference = {
  allergens: Allergen[];
  positiveRatings: Rating[];
  negativeRatings: Rating[];
  positiveNutritionalValueNames: NutritionalValueName[];
  negativeNutritionalValueNames: NutritionalValueName[];
  positivePackageTypes: PackageType[];
  negativePackageTypes: PackageType[];
};
