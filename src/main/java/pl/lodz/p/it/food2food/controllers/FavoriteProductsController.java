package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.p.it.food2food.dto.responses.BooleanResponse;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.ProductAlreadyInFavorites;
import pl.lodz.p.it.food2food.exceptions.ProductNotInFavorites;
import pl.lodz.p.it.food2food.mappers.ProductMapper;
import pl.lodz.p.it.food2food.services.FavoriteProductsService;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/v1/favorite-products")
@Transactional(propagation = Propagation.NEVER)
@RequiredArgsConstructor
public class FavoriteProductsController {
    private final FavoriteProductsService favoriteProductsService;
    private final ProductMapper productMapper;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<ProductDto>> getFavoriteProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();

        Pageable pageable = PageRequest.of(page, size);
        try {
            return ResponseEntity.ok(favoriteProductsService.getFavoriteProducts(userId ,name, pageable).map(productMapper::toProductDto));
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{productId}")
    public ResponseEntity<?> addFavoriteProduct(@PathVariable UUID productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();
        try {
            favoriteProductsService.addFavoriteProduct(userId, productId);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductAlreadyInFavorites e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFavoriteProduct(@PathVariable UUID productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();
        try{
        favoriteProductsService.removeFavoriteProduct(userId, productId);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductNotInFavorites e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{productId}")
    public ResponseEntity<BooleanResponse> checkFavoriteProduct(@PathVariable UUID productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(new BooleanResponse(favoriteProductsService.isFavorite(userId, productId)));
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }
}
