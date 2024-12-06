package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.services.FavoriteProductsService;
import pl.lodz.p.it.food2food.services.JwtService;

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
        return favoriteProductsService.getFavoriteProducts(userId ,name, pageable);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{productId}")
    public void addFavoriteProduct( @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable UUID productId) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));
        favoriteProductsService.addFavoriteProduct(userId, productId);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{productId}")
    public void removeFavoriteProduct( @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable UUID productId) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));
        favoriteProductsService.removeFavoriteProduct(userId, productId);
    }
}
