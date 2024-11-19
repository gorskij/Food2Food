package pl.lodz.p.it.food2food.dto;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Flavour}
 */
public record FlavourDto(UUID id, @NotNull String name) implements Serializable {
}