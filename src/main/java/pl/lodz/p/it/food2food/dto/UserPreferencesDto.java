package pl.lodz.p.it.food2food.dto;

import java.util.Set;
import java.util.UUID;

public record UserPreferencesDto(Set<UUID> allergens, Set<UUID> ratings) {
}
