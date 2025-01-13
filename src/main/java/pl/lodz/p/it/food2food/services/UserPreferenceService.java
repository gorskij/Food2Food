package pl.lodz.p.it.food2food.services;

import pl.lodz.p.it.food2food.dto.UserPreferenceDto;
import pl.lodz.p.it.food2food.exceptions.ApplicationOptimisticLockException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.UserPreference;

import java.util.UUID;

public interface UserPreferenceService {
    UserPreference createUserPreference(UserPreference userPreference);
    UserPreference getUserPreference(UUID id) throws NotFoundException;

    UserPreference updateUserPreference(UUID userId, UserPreferenceDto userPreferenceDto, String tagValue) throws NotFoundException, ApplicationOptimisticLockException;
}
