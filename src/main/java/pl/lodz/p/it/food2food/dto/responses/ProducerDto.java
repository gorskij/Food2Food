package pl.lodz.p.it.food2food.dto.responses;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Producer}
 */
public record ProducerDto(UUID id, @NotNull String name, String address, Integer countryCode, String NIP,
                          Integer RMSD, String contact) implements Serializable {
}