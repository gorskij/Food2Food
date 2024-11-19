package pl.lodz.p.it.food2food.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.ProductDto;
import pl.lodz.p.it.food2food.mappers.ProductMapper;
import pl.lodz.p.it.food2food.model.Product;
import pl.lodz.p.it.food2food.repositories.ProductRepository;
import pl.lodz.p.it.food2food.dto.ProductDetailsDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toProductDto)
                .collect(Collectors.toList());
    }

    public ProductDetailsDto getProduct(UUID id) {
        Optional<Product> product = productRepository.findById(id);
//                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        return productMapper.toProductDetailsDto(product.get());
    }
}
