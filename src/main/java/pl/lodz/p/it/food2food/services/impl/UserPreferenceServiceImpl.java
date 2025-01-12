package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.UserPreferenceDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.Allergen;
import pl.lodz.p.it.food2food.model.Rating;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.repositories.AllergenRepository;
import pl.lodz.p.it.food2food.repositories.RatingRepository;
import pl.lodz.p.it.food2food.repositories.UserPreferenceRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.UserPreferenceService;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserPreferenceServiceImpl implements UserPreferenceService {
    public final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;
    private final AllergenRepository allergenRepository;
    private final RatingRepository ratingRepository;

    @Override
    public UserPreference createUserPreference(UserPreference userPreference) {
        return userPreferenceRepository.save(userPreference);
    }

    @Override
    public UserPreference getUserPreference(UUID id) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        return user.getUserPreference();
    }

    @Override
    public UserPreference updateUserPreference(UUID userId, UserPreferenceDto userPreferenceDto) throws NotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        UserPreference userPreference = user.getUserPreference();

        List<Allergen> allergens = allergenRepository.findAllById(userPreferenceDto.allergens());
        List<Rating> ratings = ratingRepository.findAllById(userPreferenceDto.ratings());

        userPreference.setAllergens(new HashSet<>(allergens));
        userPreference.setRatings(new HashSet<>(ratings));

        return userPreferenceRepository.save(userPreference);
    }
}
