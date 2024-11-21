package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.food2food.dto.ProductDetailsDto;
import pl.lodz.p.it.food2food.dto.ProductDto;
import pl.lodz.p.it.food2food.services.ProductService;

import org.springframework.data.domain.Pageable;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Page<ProductDto> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getAllProducts(pageable);
    }

    @GetMapping("/{id}")
    public ProductDetailsDto getProduct(@PathVariable UUID id) {
        return productService.getProduct(id);
    }

}
