package pl.lodz.p.it.food2food.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.ProductAlreadyInFavorites;
import pl.lodz.p.it.food2food.exceptions.ProductNotInFavorites;
import pl.lodz.p.it.food2food.model.Product;

import java.util.UUID;

public interface FavoriteProductsService {
    Page<Product> getFavoriteProducts(UUID userId, String name, Pageable pageable) throws NotFoundException;

    boolean isFavorite(UUID userId, UUID productId) throws NotFoundException;

    void addFavoriteProduct(UUID userId, UUID productId) throws NotFoundException, ProductAlreadyInFavorites;

    void removeFavoriteProduct(UUID userId, UUID productId) throws NotFoundException, ProductNotInFavorites;
}
