package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Label}
 */
public record LabelDto(UUID id, Set<AllergenDto> allergens, String storage, String durability,
                       String instructionsAfterOpening, String preparation, byte[] image) implements Serializable {
}