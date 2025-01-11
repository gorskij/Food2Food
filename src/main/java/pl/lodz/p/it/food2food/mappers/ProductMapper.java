package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.dto.responses.ProductDetailsDto;
import pl.lodz.p.it.food2food.model.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "label.image", target = "labelImage")
    ProductDto toProductDto(Product product);

    ProductDetailsDto toProductDetailsDto(Product product);

}
