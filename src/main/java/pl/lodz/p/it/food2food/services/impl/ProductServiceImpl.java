package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.ExceptionMessages;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.services.ProductService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public Page<Product> getAllProducts(String name, Pageable pageable) {
        if (name != null && !name.isEmpty()) {
            return productRepository.findByProductNameContainingIgnoreCase(name, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

    @Override
    public Product getProduct(UUID id) throws NotFoundException {

        return productRepository.findById(id).orElseThrow(() -> new NotFoundException(ExceptionMessages.PRODUCT_NOT_FOUND, ErrorCodes.PRODUCT_NOT_FOUND));
    }
}
