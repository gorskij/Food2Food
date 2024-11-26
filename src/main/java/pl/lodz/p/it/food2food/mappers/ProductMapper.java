package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.dto.responses.ProductDetailsDto;
import pl.lodz.p.it.food2food.model.Product;

@Mapper(componentModel = "spring", uses = {
        ProducerMapper.class,
        UnitMapper.class,
        PackageTypeMapper.class,
        CompositionMapper.class,
        NutritionalIndexMapper.class,
        ProductIndexMapper.class,
        LabelMapper.class,
        PortionMapper.class,
        RatingMapper.class,
        NutritionalValueMapper.class
})
public interface ProductMapper {

    // Map Product to ProductDto
    @Mapping(source = "label.image", target = "labelImage")
    ProductDto toProductDto(Product product);

    // Map Product to ProductDetailsDto
    ProductDetailsDto toProductDetailsDto(Product product);

}
