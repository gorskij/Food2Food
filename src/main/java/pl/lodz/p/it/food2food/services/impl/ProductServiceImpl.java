package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.messages.ExceptionMessages;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.services.ProductService;

import java.util.UUID;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    @PreAuthorize("permitAll()")
    public Page<Product> getAllProducts(String name, Pageable pageable) {
        if (name != null && !name.isEmpty()) {
            return productRepository.findByProductNameContainingIgnoreCase(name, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

    @Override
    @Transactional(rollbackFor = NotFoundException.class)
    @PreAuthorize("permitAll()")
    public Product getProduct(UUID id) throws NotFoundException {
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException(ExceptionMessages.PRODUCT_NOT_FOUND, ErrorCodes.PRODUCT_NOT_FOUND));
    }
}
