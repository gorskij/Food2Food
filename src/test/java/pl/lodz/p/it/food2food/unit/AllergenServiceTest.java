package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.lodz.p.it.food2food.model.Allergen;
import pl.lodz.p.it.food2food.repositories.AllergenRepository;
import pl.lodz.p.it.food2food.services.impl.AllergenServiceImpl;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AllergenServiceTest {
    @Mock
    private AllergenRepository allergenRepository;

    @InjectMocks
    private AllergenServiceImpl allergenService;

    private List<Allergen> allergenList;

    @BeforeEach
    void setUp() {
        allergenList = Arrays.asList(
                new Allergen("Peanuts"),
                new Allergen("Milk")
        );
    }

    @Test
    void getAll_ShouldReturnAllergens() {
        when(allergenRepository.findAll()).thenReturn(allergenList);

        List<Allergen> result = allergenService.getAllAllergens();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Peanuts", result.get(0).getName());
        assertEquals("Milk", result.get(1).getName());

        verify(allergenRepository, times(1)).findAll();
    }

}
