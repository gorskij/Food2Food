package pl.lodz.p.it.food2food.dto.responses;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Ingredient}
 */
public record IngredientDto(UUID id, @NotNull String name) implements Serializable {
}