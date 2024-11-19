package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.NutritionalIndexDto;
import pl.lodz.p.it.food2food.model.NutritionalIndex;

@Mapper(componentModel = "spring")
public interface NutritionalIndexMapper {
    NutritionalIndexDto toNutritionalIndexDto(NutritionalIndex nutritionalIndex);
}
