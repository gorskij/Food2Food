package pl.lodz.p.it.food2food.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link pl.lodz.p.it.food2food.model.Product}
 */
public record ProductDetailsDto (
        String ean,
        String productName,
        String productDescription,
        Integer productQuantity,
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
