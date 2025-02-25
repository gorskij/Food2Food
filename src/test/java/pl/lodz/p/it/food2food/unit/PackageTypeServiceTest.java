package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.lodz.p.it.food2food.model.PackageType;
import pl.lodz.p.it.food2food.repositories.PackageTypeRepository;
import pl.lodz.p.it.food2food.services.impl.PackageTypeServiceImpl;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PackageTypeServiceTest {
    @Mock
    private PackageTypeRepository packageTypeRepository;

    @InjectMocks
    private PackageTypeServiceImpl packageTypeService;

    private List<PackageType> packageTypeList;

    @BeforeEach
    void setUp() {
        packageTypeList = Arrays.asList(
                new PackageType("Plastic"),
                new PackageType("Paper")
        );
    }

    @Test
    void getAll_ShouldReturnPackageTypes() {
        when(packageTypeRepository.findAll()).thenReturn(packageTypeList);

        List<PackageType> result = packageTypeService.getAllPackageTypes();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Plastic", result.get(0).getName());
        assertEquals("Paper", result.get(1).getName());

        verify(packageTypeRepository, times(1)).findAll();
    }

}
