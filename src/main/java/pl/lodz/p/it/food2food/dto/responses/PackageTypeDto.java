package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.PackageType}
 */
public record PackageTypeDto(UUID id, String name) implements Serializable {
}