package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.lodz.p.it.food2food.model.NutritionalValueGroup;
import pl.lodz.p.it.food2food.model.NutritionalValueName;
import pl.lodz.p.it.food2food.repositories.NutritionalValueNameRepository;
import pl.lodz.p.it.food2food.services.impl.NutritionalValueNameServiceImpl;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NutritionalValueNameServiceTest {
    @Mock
    private NutritionalValueNameRepository nutritionalValueNameRepository;

    @InjectMocks
    private NutritionalValueNameServiceImpl nutritionalValueNameService;

    private List<NutritionalValueName> nutritionalValueNameList;

    @BeforeEach
    void setUp() {
        NutritionalValueGroup nutritionalValueGroup = new NutritionalValueGroup("Macronutrients");

        nutritionalValueNameList = Arrays.asList(
                new NutritionalValueName(nutritionalValueGroup, "Calories"),
                new NutritionalValueName(nutritionalValueGroup, "Protein")
        );
    }

    @Test
    void getAll_ShouldReturnNutritionalValueNames() {
        when(nutritionalValueNameRepository.findAll()).thenReturn(nutritionalValueNameList);

        List<NutritionalValueName> result = nutritionalValueNameService.getAllNutritionalValueNames();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Calories", result.get(0).getName());
        assertEquals("Protein", result.get(1).getName());

        verify(nutritionalValueNameRepository, times(1)).findAll();
    }
}
