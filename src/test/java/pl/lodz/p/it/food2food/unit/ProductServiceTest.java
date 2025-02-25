package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.services.impl.ProductServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private List<Product> productList;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        pageable = PageRequest.of(0, 10, Sort.by("productName"));

        productList = List.of(new Product(), new Product(), new Product());

        List<String> names = List.of("Apple", "Banana", "Carrot");

        for (int i = 0; i < productList.size(); i++) {
            productList.get(i).setId(UUID.randomUUID());
            productList.get(i).setProductName(names.get(i));
        }
    }

    @Test
    void getAllProducts_NoFilter_ShouldReturnAllProducts() {
        Page<Product> mockPage = new PageImpl<>(productList);
        when(productRepository.findAll(pageable)).thenReturn(mockPage);

        Page<Product> result = assertDoesNotThrow(() -> productService.getAllProducts(null, pageable));

        assertNotNull(result);
        assertEquals(3, result.getTotalElements());
        assertEquals("Apple", result.getContent().get(0).getProductName());
        assertEquals("Banana", result.getContent().get(1).getProductName());
        assertEquals("Carrot", result.getContent().get(2).getProductName());

        verify(productRepository, times(1)).findAll(pageable);
    }

    @Test
    void getAllProducts_FilterByName_ShouldReturnMatchingProducts() {
        Page<Product> filteredPage = new PageImpl<>(List.of(productList.getFirst())); // Apple
        when(productRepository.findByProductNameContainingIgnoreCase("Apple", pageable)).thenReturn(filteredPage);

        Page<Product> result = assertDoesNotThrow(() -> productService.getAllProducts("Apple", pageable));

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Apple", result.getContent().getFirst().getProductName());

        verify(productRepository, times(1)).findByProductNameContainingIgnoreCase("Apple", pageable);
    }

    @Test
    void getProduct_ExistingId_ShouldReturnProduct() {
        Product product = productList.get(1);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        Product result = assertDoesNotThrow(() -> productService.getProduct(product.getId()));

        assertNotNull(result);
        assertEquals(product.getId(), result.getId());
        assertEquals("Banana", result.getProductName());

        verify(productRepository, times(1)).findById(product.getId());
    }

    @Test
    void getProduct_NonExistingId_ShouldThrowNotFoundException() {
        UUID unknownId = UUID.randomUUID();
        when(productRepository.findById(unknownId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> productService.getProduct(unknownId));

        verify(productRepository, times(1)).findById(unknownId);
    }
}
