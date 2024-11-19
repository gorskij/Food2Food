package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.UnitDto;
import pl.lodz.p.it.food2food.model.Unit;

@Mapper(componentModel = "spring")
public interface UnitMapper {

    UnitDto toUnitDto(Unit unit);
}
