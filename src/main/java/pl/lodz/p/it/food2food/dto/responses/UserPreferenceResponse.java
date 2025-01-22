package pl.lodz.p.it.food2food.dto.responses;

import pl.lodz.p.it.food2food.model.Allergen;
import pl.lodz.p.it.food2food.model.NutritionalValueName;
import pl.lodz.p.it.food2food.model.PackageType;
import pl.lodz.p.it.food2food.model.Rating;

import java.util.Set;

public record UserPreferenceResponse(
        Set<Allergen> allergens,
        Set<Rating> positiveRatings,
        Set<Rating> negativeRatings,
        Set<NutritionalValueName> positiveNutritionalValueNames,
        Set<NutritionalValueName> negativeNutritionalValueNames,
        Set<PackageType> positivePackageTypes,
        Set<PackageType> negativePackageTypes
) {
}
