package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.PortionDto;
import pl.lodz.p.it.food2food.model.Portion;

@Mapper(componentModel = "spring")
public interface PortionMapper {
    PortionDto toPortionDto(Portion portion);
}
