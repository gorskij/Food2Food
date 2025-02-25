package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.ProductAlreadyInFavorites;
import pl.lodz.p.it.food2food.exceptions.ProductNotInFavorites;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.impl.FavoriteProductsServiceImpl;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FavoriteProductsServiceTest {
    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FavoriteProductsServiceImpl favoriteProductsService;

    private User user;
    private List<Product> productList;
    private UUID userId;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User();
        user.setId(userId);
        user.setFavoriteProducts(new HashSet<>());

        pageable = PageRequest.of(0, 10, Sort.by("productName"));

        productList = List.of(new Product(), new Product(), new Product());
        List<String> names = List.of("Apple", "Banana", "Carrot");

        for (int i = 0; i < productList.size(); i++) {
            productList.get(i).setId(UUID.randomUUID());
            productList.get(i).setProductName(names.get(i));
            productList.get(i).setFavoriteCount(0);
        }
    }

    @Test
    void getFavoriteProducts_NoFilter_ShouldReturnPage() {
        Page<Product> productPage = new PageImpl<>(productList);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findFavoriteProductsByUserId(userId, pageable)).thenReturn(productPage);

        Page<Product> result = assertDoesNotThrow(() -> favoriteProductsService.getFavoriteProducts(userId, null, pageable));

        assertEquals(productList.size(), result.getContent().size());
        verify(productRepository, times(1)).findFavoriteProductsByUserId(userId, pageable);
    }

    @Test
    void getFavoriteProducts_WithFilter_ShouldReturnFilteredPage() {
        Page<Product> filteredPage = new PageImpl<>(List.of(productList.getFirst())); // Only "Apple"
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findFavoriteProductsByUserIdAndName(userId, "Apple", pageable)).thenReturn(filteredPage);

        Page<Product> result = assertDoesNotThrow(() -> favoriteProductsService.getFavoriteProducts(userId, "Apple", pageable));

        assertEquals(1, result.getContent().size());
        assertEquals("Apple", result.getContent().getFirst().getProductName());
        verify(productRepository, times(1)).findFavoriteProductsByUserIdAndName(userId, "Apple", pageable);
    }

    @Test
    void isFavorite_ProductInFavorites_ShouldReturnTrue() {
        user.getFavoriteProducts().add(productList.get(1)); // "Banana"

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.get(1).getId())).thenReturn(Optional.of(productList.get(1)));

        boolean result = assertDoesNotThrow(() -> favoriteProductsService.isFavorite(userId, productList.get(1).getId()));

        assertTrue(result);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void isFavorite_ProductNotInFavorites_ShouldReturnFalse() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.get(2).getId())).thenReturn(Optional.of(productList.get(2)));

        boolean result = assertDoesNotThrow(() -> favoriteProductsService.isFavorite(userId, productList.get(2).getId()));

        assertFalse(result);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void addFavoriteProduct_ProductNotInFavorites_ShouldAddSuccessfully() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.getFirst().getId())).thenReturn(Optional.of(productList.getFirst()));

        assertDoesNotThrow(() -> favoriteProductsService.addFavoriteProduct(userId, productList.getFirst().getId()));

        assertTrue(user.getFavoriteProducts().contains(productList.getFirst()));
        verify(productRepository, times(1)).incrementFavoriteCount(productList.getFirst().getId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void addFavoriteProduct_ProductAlreadyInFavorites_ShouldThrowException() {
        user.getFavoriteProducts().add(productList.get(1));

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.get(1).getId())).thenReturn(Optional.of(productList.get(1)));

        assertThrows(ProductAlreadyInFavorites.class, () -> favoriteProductsService.addFavoriteProduct(userId, productList.get(1).getId()));

        verify(productRepository, never()).incrementFavoriteCount(productList.get(1).getId());
        verify(userRepository, never()).save(user);
    }

    @Test
    void removeFavoriteProduct_ProductInFavorites_ShouldRemoveSuccessfully() {
        user.getFavoriteProducts().add(productList.get(2));

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.get(2).getId())).thenReturn(Optional.of(productList.get(2)));

        assertDoesNotThrow(() -> favoriteProductsService.removeFavoriteProduct(userId, productList.get(2).getId()));

        assertFalse(user.getFavoriteProducts().contains(productList.get(2)));
        verify(productRepository, times(1)).decrementFavoriteCount(productList.get(2).getId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void removeFavoriteProduct_ProductNotInFavorites_ShouldThrowException() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.get(2).getId())).thenReturn(Optional.of(productList.get(2)));

        assertThrows(ProductNotInFavorites.class, () -> favoriteProductsService.removeFavoriteProduct(userId, productList.get(2).getId()));

        verify(productRepository, never()).decrementFavoriteCount(productList.get(2).getId());
        verify(userRepository, never()).save(user);
    }

    @Test
    void getFavoriteProducts_UserNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.getFavoriteProducts(userId, null, pageable));

        verify(productRepository, never()).findFavoriteProductsByUserId(any(), any());
    }

    @Test
    void isFavorite_UserNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.isFavorite(userId, productList.getFirst().getId()));

        verify(productRepository, never()).findById(any());
    }

    @Test
    void isFavorite_ProductNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.getFirst().getId())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.isFavorite(userId, productList.getFirst().getId()));
    }

    @Test
    void addFavoriteProduct_UserNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.addFavoriteProduct(userId, productList.getFirst().getId()));

        verify(productRepository, never()).findById(any());
        verify(productRepository, never()).incrementFavoriteCount(any());
    }

    @Test
    void addFavoriteProduct_ProductNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.getFirst().getId())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.addFavoriteProduct(userId, productList.getFirst().getId()));

        verify(productRepository, never()).incrementFavoriteCount(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    void removeFavoriteProduct_UserNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.removeFavoriteProduct(userId, productList.getFirst().getId()));

        verify(productRepository, never()).findById(any());
        verify(productRepository, never()).decrementFavoriteCount(any());
    }

    @Test
    void removeFavoriteProduct_ProductNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(productRepository.findById(productList.getFirst().getId())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> favoriteProductsService.removeFavoriteProduct(userId, productList.getFirst().getId()));

        verify(productRepository, never()).decrementFavoriteCount(any());
        verify(userRepository, never()).save(any());
    }
}

