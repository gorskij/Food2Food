package pl.lodz.p.it.food2food.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.NutritionalValueName}
 */
public record NutritionalValueNameDto(UUID id, NutritionalValueGroupDto group, String name) implements Serializable {
}