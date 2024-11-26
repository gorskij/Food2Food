package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.ProducerDto;
import pl.lodz.p.it.food2food.model.Producer;

@Mapper(componentModel = "spring")
public interface ProducerMapper {

    ProducerDto toProducerDto(Producer producer);
}
