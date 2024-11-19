package pl.lodz.p.it.food2food.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.NutritionalIndex}
 */
public record NutritionalIndexDto(UUID id, Integer indexValue, String legend) implements Serializable {
}