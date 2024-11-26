package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.NutritionalValueDto;
import pl.lodz.p.it.food2food.model.NutritionalValue;

@Mapper(componentModel = "spring")
public interface NutritionalValueMapper {
    NutritionalValueDto toNutritionalValueDto(NutritionalValue nutritionalValue);
}
