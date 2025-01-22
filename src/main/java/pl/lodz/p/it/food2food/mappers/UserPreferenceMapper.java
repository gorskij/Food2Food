package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.UserPreferenceResponse;
import pl.lodz.p.it.food2food.model.*;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserPreferenceMapper {
    UserPreferenceResponse toUserPreferenceResponse(UserPreference userPreference);

    default Set<UUID> mapAllergens(Set<Allergen> allergens) {
        return allergens.stream()
                .map(Allergen::getId)
                .collect(Collectors.toSet());
    }

    default Set<UUID> mapRatings(Set<Rating> ratings) {
        return ratings.stream()
                .map(Rating::getId)
                .collect(Collectors.toSet());
    }

    default Set<UUID> mapNutritionalValueNames(Set<NutritionalValueName> nutritionalValueNames) {
        return nutritionalValueNames.stream()
                .map(NutritionalValueName::getId)
                .collect(Collectors.toSet());
    }

    default Set<UUID> mapPackageTypes(Set<PackageType> packageTypes) {
        return packageTypes.stream()
                .map(PackageType::getId)
                .collect(Collectors.toSet());
    }
}
