package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.NutritionalValue}
 */
public record NutritionalValueDto(UUID id, NutritionalValueNameDto nutritionalValueName, Double quantity, UnitDto unit,
                                  Double nrv) implements Serializable {
}