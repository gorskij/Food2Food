package pl.lodz.p.it.food2food.services;

import pl.lodz.p.it.food2food.dto.UserPreferencesDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.UserPreference;

import java.util.UUID;

public interface UserPreferencesService {
    UserPreference create(UserPreference userPreference);
    UserPreferencesDto getUserPreference(UUID id) throws NotFoundException;
}
