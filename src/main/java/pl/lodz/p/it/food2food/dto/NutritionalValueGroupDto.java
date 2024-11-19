package pl.lodz.p.it.food2food.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.NutritionalValueGroup}
 */
public record NutritionalValueGroupDto(UUID id, String groupName) implements Serializable {
}