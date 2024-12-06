package pl.lodz.p.it.food2food.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.mappers.ProductMapper;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import org.springframework.retry.annotation.Retryable;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FavoriteProductsService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;

    public Page<ProductDto> getFavoriteProducts(UUID userId, String name, Pageable pageable) {
//        UUID id = UUID.fromString("03a8eb75-bfc0-4b77-a6b0-f9b3e26ebb64");
        User user = userRepository.findById(userId).get();
        if (name != null && !name.isEmpty()) {
            return productRepository.findFavoriteProductsByUserIdAndName(userId, name, pageable)
                    .map(productMapper::toProductDto);
        } else {
            return productRepository.findFavoriteProductsByUserId(userId, pageable)
                    .map(productMapper::toProductDto);
        }
    }

    @Transactional
    @Retryable(maxAttempts = 5)
    public void addFavoriteProduct(UUID userId, UUID productId) {
        UUID id = UUID.fromString("03a8eb75-bfc0-4b77-a6b0-f9b3e26ebb64");
        User user = userRepository.findById(id).get();
        if(user.getFavoriteProducts().add(productRepository.findById(productId).get())) {
            productRepository.incrementFavoriteCount(productId);
            userRepository.save(user);
        }
    }

    @Transactional
    @Retryable(maxAttempts = 5)
    public void removeFavoriteProduct(UUID userId, UUID productId) {
        UUID id = UUID.fromString("03a8eb75-bfc0-4b77-a6b0-f9b3e26ebb64");
        User user = userRepository.findById(id).get();
        if(user.getFavoriteProducts().remove(productRepository.findById(productId).get())) {
            productRepository.decrementFavoriteCount(productId);
            userRepository.save(user);
        }
    }
}
