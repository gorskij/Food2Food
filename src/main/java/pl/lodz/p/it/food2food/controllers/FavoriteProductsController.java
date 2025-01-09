package pl.lodz.p.it.food2food.controllers;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.retry.annotation.Retryable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.p.it.food2food.dto.responses.BooleanResponse;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.ProductAlreadyInFavorites;
import pl.lodz.p.it.food2food.exceptions.ProductNotInFavorites;
import pl.lodz.p.it.food2food.services.FavoriteProductsService;
import pl.lodz.p.it.food2food.services.impl.JwtService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/favorite-products")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class FavoriteProductsController {
    private final FavoriteProductsService favoriteProductsService;
    private final JwtService jwtService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public Page<ProductDto> getFavoriteProducts(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));

        Pageable pageable = PageRequest.of(page, size);
        try {
            return favoriteProductsService.getFavoriteProducts(userId ,name, pageable);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    @Retryable
    @PostMapping("/{productId}")
    public void addFavoriteProduct( @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable UUID productId) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));
        try {
            favoriteProductsService.addFavoriteProduct(userId, productId);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductAlreadyInFavorites e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    @Retryable
    @DeleteMapping("/{productId}")
    public void removeFavoriteProduct( @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable UUID productId) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));
        try{
        favoriteProductsService.removeFavoriteProduct(userId, productId);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductNotInFavorites e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{productId}")
    public BooleanResponse checkFavoriteProduct(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable UUID productId) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));
        try {
            return new BooleanResponse(favoriteProductsService.isFavorite(userId, productId));
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }
}
