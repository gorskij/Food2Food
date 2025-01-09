package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.responses.ProductDto;
import pl.lodz.p.it.food2food.mappers.ProductMapper;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.dto.responses.ProductDetailsDto;
import pl.lodz.p.it.food2food.services.ProductService;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public Page<ProductDto> getAllProducts(String name, Pageable pageable) {
        if (name != null && !name.isEmpty()) {
            return productRepository.findByProductNameContainingIgnoreCase(name, pageable)
                    .map(productMapper::toProductDto);
        } else {
            return productRepository.findAll(pageable)
                    .map(productMapper::toProductDto);
        }
    }

    @Override
    public ProductDetailsDto getProduct(UUID id) {
        Optional<Product> product = productRepository.findById(id);
//                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        return productMapper.toProductDetailsDto(product.get());
    }
}
