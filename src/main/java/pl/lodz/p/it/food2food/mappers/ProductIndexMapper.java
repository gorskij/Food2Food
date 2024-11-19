package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.ProductIndexDto;
import pl.lodz.p.it.food2food.model.ProductIndex;

@Mapper(componentModel = "spring")
public interface ProductIndexMapper {

    ProductIndexDto toProductIndexDto(ProductIndex productIndex);
}
