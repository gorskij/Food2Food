package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.lodz.p.it.food2food.dto.UserPreferenceDto;
import pl.lodz.p.it.food2food.model.Allergen;
import pl.lodz.p.it.food2food.model.Rating;
import pl.lodz.p.it.food2food.model.UserPreference;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserPreferenceMapper {
    UserPreferenceDto toUserPreferenceDto(UserPreference userPreference);

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
}
