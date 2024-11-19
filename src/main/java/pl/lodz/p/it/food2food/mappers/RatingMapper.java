package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.RatingDto;
import pl.lodz.p.it.food2food.model.Rating;

@Mapper(componentModel = "spring")
public interface RatingMapper {

     RatingDto toRatingDto(Rating rating);
}
