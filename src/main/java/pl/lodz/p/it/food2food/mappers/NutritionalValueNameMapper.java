package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.NutritionalValueNameDto;
import pl.lodz.p.it.food2food.model.NutritionalValueName;

@Mapper(componentModel = "spring")
public interface NutritionalValueNameMapper {
    NutritionalValueNameDto toNutritionalValueNameDto(NutritionalValueName NutritionalValueName);
}
