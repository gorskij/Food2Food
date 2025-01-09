package pl.lodz.p.it.food2food.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.lodz.p.it.food2food.dto.responses.ProductDetailsDto;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;

import java.util.UUID;

public interface ProductService {
    Page<ProductDto> getAllProducts(String name, Pageable pageable);

    ProductDetailsDto getProduct(UUID id);
}
