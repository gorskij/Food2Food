package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.CompositionDto;
import pl.lodz.p.it.food2food.model.Composition;

@Mapper(componentModel = "spring")
public interface CompositionMapper {

    CompositionDto toCompositionDto(Composition composition);
}
