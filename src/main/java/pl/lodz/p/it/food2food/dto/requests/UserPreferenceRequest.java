package pl.lodz.p.it.food2food.dto.requests;

import java.util.Set;
import java.util.UUID;

public record UserPreferenceRequest(
        Set<UUID> allergens,
        Set<UUID> positiveRatings,
        Set<UUID> negativeRatings,
        Set<UUID> positiveNutritionalValueNames,
        Set<UUID> negativeNutritionalValueNames,
        Set<UUID> positivePackageTypes,
        Set<UUID> negativePackageTypes
) {
}