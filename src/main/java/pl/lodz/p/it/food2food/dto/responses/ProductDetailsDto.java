package pl.lodz.p.it.food2food.dto.responses;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Product}
 */
public record ProductDetailsDto (
        UUID id,
        String ean,
        String productName,
        String productDescription,
        Integer productQuantity,
        Integer favoriteCount,
        String country,
        ProducerDto producer,
        UnitDto unit,
        PackageTypeDto packageType,
        CompositionDto composition,
        Set<NutritionalIndexDto> nutritionalIndexes,
        Set<ProductIndexDto> productIndexes,
        LabelDto label,
        PortionDto portion,
        Set<RatingDto> ratings,
        List<NutritionalValueDto> nutritionalValues
) implements Serializable {}
