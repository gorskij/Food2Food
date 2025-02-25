package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.lodz.p.it.food2food.dto.requests.UserPreferenceRequest;
import pl.lodz.p.it.food2food.exceptions.ApplicationOptimisticLockException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.*;
import pl.lodz.p.it.food2food.repositories.*;
import pl.lodz.p.it.food2food.services.impl.UserPreferenceServiceImpl;
import pl.lodz.p.it.food2food.utils.EtagSignVerifier;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserPreferenceServiceTest {

    @Mock
    private UserPreferenceRepository userPreferenceRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AllergenRepository allergenRepository;

    @Mock
    private RatingRepository ratingRepository;

    @Mock
    private NutritionalValueNameRepository nutritionalValueNameRepository;

    @Mock
    private PackageTypeRepository packageTypeRepository;

    @Mock
    private EtagSignVerifier etagSignVerifier;

    @InjectMocks
    private UserPreferenceServiceImpl userPreferenceService;

    private User user;
    private UserPreference userPreference;
    private UUID userId;
    private String validEtag;
    private String invalidEtag;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        userPreference = new UserPreference();
        userPreference.setId(UUID.randomUUID());
        userPreference.setVersion(1L);
        userPreference.setAllergens(new HashSet<>());
        userPreference.setPositiveRatings(new HashSet<>());
        userPreference.setNegativeRatings(new HashSet<>());
        userPreference.setPositiveNutritionalValueNames(new HashSet<>());
        userPreference.setNegativeNutritionalValueNames(new HashSet<>());
        userPreference.setPositivePackageTypes(new HashSet<>());
        userPreference.setNegativePackageTypes(new HashSet<>());

        user = new User("testUser", "test@example.com", userPreference);
        user.setId(userId);

        validEtag = "valid-etag";
        invalidEtag = "invalid-etag";
    }

    @Test
    void getUserPreference_UserNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> userPreferenceService.getUserPreference(userId));

        verify(userRepository).findById(userId);
    }

    @Test
    void getUserPreference_UserFound_ShouldReturnUserPreference() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        UserPreference result = assertDoesNotThrow(() -> userPreferenceService.getUserPreference(userId));
        assertNotNull(result);
        assertEquals(userPreference, result);

        verify(userRepository).findById(userId);
    }

    @Test
    void updateUserPreference_UserNotFound_ShouldThrowNotFoundException() {
        UserPreferenceRequest request = new UserPreferenceRequest(Set.of(), Set.of(), Set.of(), Set.of(), Set.of(), Set.of(), Set.of());

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> userPreferenceService.updateUserPreference(userId, request, validEtag));

        verify(userRepository).findById(userId);
        verify(etagSignVerifier, never()).verifySignature(any(), any(), any());
    }

    @Test
    void updateUserPreference_EtagMismatch_ShouldThrowApplicationOptimisticLockException() {
        UserPreferenceRequest request = new UserPreferenceRequest(Set.of(), Set.of(), Set.of(), Set.of(), Set.of(), Set.of(), Set.of());

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(etagSignVerifier.verifySignature(userPreference.getId(), userPreference.getVersion(), invalidEtag)).thenReturn(false);

        assertThrows(ApplicationOptimisticLockException.class, () -> userPreferenceService.updateUserPreference(userId, request, invalidEtag));

        verify(etagSignVerifier).verifySignature(userPreference.getId(), userPreference.getVersion(), invalidEtag);
        verify(userPreferenceRepository, never()).save(any());
    }

    @Test
    void updateUserPreference_ValidRequest_ShouldUpdateUserPreference() {
        UserPreferenceRequest request = new UserPreferenceRequest(Set.of(UUID.randomUUID()), Set.of(UUID.randomUUID()), Set.of(UUID.randomUUID()), Set.of(UUID.randomUUID()), Set.of(UUID.randomUUID()), Set.of(UUID.randomUUID()), Set.of(UUID.randomUUID()));

        List<Allergen> allergens = List.of(new Allergen());
        List<Rating> positiveRatings = List.of(new Rating());
        List<Rating> negativeRatings = List.of(new Rating());
        List<NutritionalValueName> positiveNutritionalValueNames = List.of(new NutritionalValueName());
        List<NutritionalValueName> negativeNutritionalValueNames = List.of(new NutritionalValueName());
        List<PackageType> positivePackageTypes = List.of(new PackageType());
        List<PackageType> negativePackageTypes = List.of(new PackageType());

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(etagSignVerifier.verifySignature(userPreference.getId(), userPreference.getVersion(), validEtag)).thenReturn(true);
        when(allergenRepository.findAllById(request.allergens())).thenReturn(allergens);
        when(ratingRepository.findAllById(request.positiveRatings())).thenReturn(positiveRatings);
        when(ratingRepository.findAllById(request.negativeRatings())).thenReturn(negativeRatings);
        when(nutritionalValueNameRepository.findAllById(request.positiveNutritionalValueNames())).thenReturn(positiveNutritionalValueNames);
        when(nutritionalValueNameRepository.findAllById(request.negativeNutritionalValueNames())).thenReturn(negativeNutritionalValueNames);
        when(packageTypeRepository.findAllById(request.positivePackageTypes())).thenReturn(positivePackageTypes);
        when(packageTypeRepository.findAllById(request.negativePackageTypes())).thenReturn(negativePackageTypes);
        when(userPreferenceRepository.save(userPreference)).thenReturn(userPreference);

        UserPreference updatedPreference = assertDoesNotThrow(() -> userPreferenceService.updateUserPreference(userId, request, validEtag));

        assertNotNull(updatedPreference);
        assertEquals(userPreference, updatedPreference);
        assertEquals(allergens.size(), updatedPreference.getAllergens().size());
        assertEquals(positiveRatings.size(), updatedPreference.getPositiveRatings().size());
        assertEquals(negativeRatings.size(), updatedPreference.getNegativeRatings().size());
        assertEquals(positiveNutritionalValueNames.size(), updatedPreference.getPositiveNutritionalValueNames().size());
        assertEquals(negativeNutritionalValueNames.size(), updatedPreference.getNegativeNutritionalValueNames().size());
        assertEquals(positivePackageTypes.size(), updatedPreference.getPositivePackageTypes().size());
        assertEquals(negativePackageTypes.size(), updatedPreference.getNegativePackageTypes().size());

        verify(userPreferenceRepository).save(userPreference);
    }
}
