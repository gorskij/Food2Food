package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.ProductAlreadyInFavorites;
import pl.lodz.p.it.food2food.exceptions.ProductNotInFavorites;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.ExceptionMessages;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.mappers.ProductMapper;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.FavoriteProductsService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FavoriteProductsServiceImpl implements FavoriteProductsService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;

    @Override
    public Page<Product> getFavoriteProducts(UUID userId, String name, Pageable pageable) throws NotFoundException {
        userRepository.findById(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        if (name != null && !name.isEmpty()) {
            return productRepository.findFavoriteProductsByUserIdAndName(userId, name, pageable);
        } else {
            return productRepository.findFavoriteProductsByUserId(userId, pageable);
        }
    }

    @Override
    public boolean isFavorite(UUID userId, UUID productId) throws NotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException(ExceptionMessages.PRODUCT_NOT_FOUND, ErrorCodes.PRODUCT_NOT_FOUND));
        return user.getFavoriteProducts().contains(product);
    }

    @Override
    public void addFavoriteProduct(UUID userId, UUID productId) throws NotFoundException, ProductAlreadyInFavorites {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException(ExceptionMessages.PRODUCT_NOT_FOUND, ErrorCodes.PRODUCT_NOT_FOUND));

        if(user.getFavoriteProducts().contains(product)) {
            throw new ProductAlreadyInFavorites(ExceptionMessages.PRODUCT_ALREADY_IN_FAVORITES, ErrorCodes.PRODUCT_ALREADY_IN_FAVORITES);
        }

        if(user.getFavoriteProducts().add(product)) {
            productRepository.incrementFavoriteCount(productId);
            userRepository.save(user);
        }
    }

    @Override
    public void removeFavoriteProduct(UUID userId, UUID productId) throws NotFoundException, ProductNotInFavorites {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException(ExceptionMessages.PRODUCT_NOT_FOUND, ErrorCodes.PRODUCT_NOT_FOUND));
        if(!user.getFavoriteProducts().contains(product)) {
            throw new ProductNotInFavorites(ExceptionMessages.PRODUCT_NOT_IN_FAVORITES, ErrorCodes.PRODUCT_NOT_IN_FAVORITES);
        }

        if(user.getFavoriteProducts().remove(product)) {
            productRepository.decrementFavoriteCount(productId);
            userRepository.save(user);
        }
    }
}
