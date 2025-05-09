package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Portion}
 */
public record PortionDto(UUID id, Integer portionQuantity, UnitDto unit) implements Serializable {
}