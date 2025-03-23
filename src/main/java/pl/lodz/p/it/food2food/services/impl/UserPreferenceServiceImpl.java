package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.dto.requests.UserPreferenceRequest;
import pl.lodz.p.it.food2food.exceptions.ApplicationOptimisticLockException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.messages.OptimisticLockExceptionMessages;
import pl.lodz.p.it.food2food.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.*;
import pl.lodz.p.it.food2food.repositories.*;
import pl.lodz.p.it.food2food.services.UserPreferenceService;
import pl.lodz.p.it.food2food.utils.EtagSignVerifier;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
@RequiredArgsConstructor
public class UserPreferenceServiceImpl implements UserPreferenceService {
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;
    private final AllergenRepository allergenRepository;
    private final RatingRepository ratingRepository;
    private final NutritionalValueNameRepository nutritionalValueNameRepository;
    private final PackageTypeRepository packageTypeRepository;
    private final EtagSignVerifier etagSignVerifier;

    @Override
    @PreAuthorize("hasRole('USER')")
    @Transactional(rollbackFor = NotFoundException.class)
    public UserPreference getUserPreference(UUID id) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        return user.getUserPreference();
    }

    @Override
    @PreAuthorize("hasRole('USER')")
    @Transactional(rollbackFor = {ApplicationOptimisticLockException.class, NotFoundException.class})
    public UserPreference updateUserPreference(UUID userId, UserPreferenceRequest userPreferenceRequest, String tagValue) throws NotFoundException, ApplicationOptimisticLockException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        UserPreference userPreference = user.getUserPreference();

        if (!etagSignVerifier.verifySignature(userPreference.getId(), userPreference.getVersion(), tagValue)) {
            throw new ApplicationOptimisticLockException(OptimisticLockExceptionMessages.USER_PREFERENCE_ALREADY_MODIFIED_DATA, ErrorCodes.OPTIMISTIC_LOCK);
        }

        List<Allergen> allergens = allergenRepository.findAllById(userPreferenceRequest.allergens());
        List<Rating> positiveRatings = ratingRepository.findAllById(userPreferenceRequest.positiveRatings());
        List<Rating> negativeRatings = ratingRepository.findAllById(userPreferenceRequest.negativeRatings());
        List<NutritionalValueName> positiveNutritionalValueNames = nutritionalValueNameRepository.findAllById(userPreferenceRequest.positiveNutritionalValueNames());
        List<NutritionalValueName> negativeNutritionalValueNames = nutritionalValueNameRepository.findAllById(userPreferenceRequest.negativeNutritionalValueNames());
        List<PackageType> positivePackageTypes = packageTypeRepository.findAllById(userPreferenceRequest.positivePackageTypes());
        List<PackageType> negativePackageTypes = packageTypeRepository.findAllById(userPreferenceRequest.negativePackageTypes());

        userPreference.setAllergens(new HashSet<>(allergens));
        userPreference.setPositiveRatings(new HashSet<>(positiveRatings));
        userPreference.setNegativeRatings(new HashSet<>(negativeRatings));
        userPreference.setPositiveNutritionalValueNames(new HashSet<>(positiveNutritionalValueNames));
        userPreference.setNegativeNutritionalValueNames(new HashSet<>(negativeNutritionalValueNames));
        userPreference.setPositivePackageTypes(new HashSet<>(positivePackageTypes));
        userPreference.setNegativePackageTypes(new HashSet<>(negativePackageTypes));

        return userPreferenceRepository.save(userPreference);
    }
}
