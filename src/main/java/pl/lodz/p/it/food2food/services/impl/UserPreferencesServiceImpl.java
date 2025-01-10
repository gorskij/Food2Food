package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.UserPreferencesDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.mappers.UserPreferencesMapper;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.repositories.UserPreferencesRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.UserPreferencesService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserPreferencesServiceImpl implements UserPreferencesService {
    public final UserPreferencesRepository userPreferenceRepository;
    private final UserRepository userRepository;
    private final UserPreferencesMapper userPreferencesMapper;

    @Override
    public UserPreference create(UserPreference userPreference) {
        return userPreferenceRepository.save(userPreference);
    }

    @Override
    public UserPreferencesDto getUserPreference(UUID id) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        return userPreferenceRepository.findByUserId(id).map(userPreferencesMapper::toUserPreferencesDto).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.NOT_FOUND));
    }
}
