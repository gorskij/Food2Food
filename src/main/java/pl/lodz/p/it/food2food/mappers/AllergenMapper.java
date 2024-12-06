package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.AllergenDto;
import pl.lodz.p.it.food2food.model.Allergen;

@Mapper(componentModel = "spring")
public interface AllergenMapper {
    AllergenDto toAllergenDto(Allergen allergen);
}
