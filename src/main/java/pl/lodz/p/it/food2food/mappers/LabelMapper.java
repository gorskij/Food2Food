package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.LabelDto;
import pl.lodz.p.it.food2food.model.Label;

@Mapper(componentModel = "spring")
public interface LabelMapper {

     LabelDto toLabelDto(Label label);
}
