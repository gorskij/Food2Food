package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Rating}
 */
public record RatingDto(UUID id, String groupName, String name) implements Serializable {
}