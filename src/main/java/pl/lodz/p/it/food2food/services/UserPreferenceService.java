package pl.lodz.p.it.food2food.services;

import pl.lodz.p.it.food2food.dto.requests.UserPreferenceRequest;
import pl.lodz.p.it.food2food.exceptions.ApplicationOptimisticLockException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.UserPreference;

import java.util.UUID;

public interface UserPreferenceService {
    UserPreference getUserPreference(UUID id) throws NotFoundException;

    UserPreference updateUserPreference(UUID userId, UserPreferenceRequest userPreferenceRequest, String tagValue) throws NotFoundException, ApplicationOptimisticLockException;
}
