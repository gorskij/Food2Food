package pl.lodz.p.it.food2food.dto;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Composition}
 */
public record CompositionDto(UUID id, List<IngredientDto> ingredients, List<AdditionDto> additions,
                             FlavourDto flavour) implements Serializable {
}