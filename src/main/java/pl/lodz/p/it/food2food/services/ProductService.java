package pl.lodz.p.it.food2food.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.lodz.p.it.food2food.dto.responses.ProductDetailsDto;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.Product;

import java.util.UUID;

public interface ProductService {
    Page<Product> getAllProducts(String name, Pageable pageable);

    Product getProduct(UUID id) throws NotFoundException;
}
