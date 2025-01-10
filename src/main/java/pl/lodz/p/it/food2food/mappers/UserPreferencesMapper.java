package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.UserPreferencesDto;
import pl.lodz.p.it.food2food.model.UserPreference;

@Mapper(componentModel = "spring")
public interface UserPreferencesMapper {
    UserPreferencesDto toUserPreferencesDto(UserPreference userPreference);
    UserPreference fromUserPreferencesDto(UserPreferencesDto userPreferencesDto);
}
