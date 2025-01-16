package pl.lodz.p.it.food2food.dto.responses;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record ProducerDto(UUID id, @NotNull String name, String address, Integer countryCode, String NIP,
                          Integer RMSD, String contact) {
}