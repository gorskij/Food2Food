package pl.lodz.p.it.food2food.dto.responses;

import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Product}
 */
public record ProductDto(
        UUID id,
        String productName,
        String productDescription,
        Integer favoriteCount,
        String ean,
        byte[] labelImage
) {}