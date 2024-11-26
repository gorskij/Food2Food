package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.ProductIndex}
 */
public record ProductIndexDto(UUID id, Long version, String indexName, Integer indexValue) implements Serializable {
}