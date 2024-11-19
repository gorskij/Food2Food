package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.ProducerDto;
import pl.lodz.p.it.food2food.model.Producer;

@Mapper(componentModel = "spring")
public interface ProducerMapper {

    ProducerDto toProducerDto(Producer producer);
}
