package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.responses.UserPreferenceResponse;
import pl.lodz.p.it.food2food.model.*;

@Mapper(componentModel = "spring")
public interface UserPreferenceMapper {
    UserPreferenceResponse toUserPreferenceResponse(UserPreference userPreference);
}
