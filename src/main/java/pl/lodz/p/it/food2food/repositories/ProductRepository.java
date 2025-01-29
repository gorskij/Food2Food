package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.Product;

import java.util.UUID;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface ProductRepository extends JpaRepository<Product, UUID> {


    @EntityGraph(attributePaths = {"label", "packageType", "portion", "producer"})
    Page<Product> findByProductNameContainingIgnoreCase(String name, Pageable pageable);

    @EntityGraph(attributePaths = {"label", "packageType", "portion", "producer"})
    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p FROM User u JOIN u.favoriteProducts p WHERE u.id = :userId")
    @EntityGraph(attributePaths = {"label", "packageType", "portion", "producer"})
    Page<Product> findFavoriteProductsByUserId(@Param("userId") UUID userId, Pageable pageable);

    @Query("SELECT p FROM User u JOIN u.favoriteProducts p WHERE u.id = :userId AND LOWER(p.productName) LIKE LOWER(CONCAT('%', :name, '%'))")
    @EntityGraph(attributePaths = {"label", "packageType", "portion", "producer"})
    Page<Product> findFavoriteProductsByUserIdAndName(@Param("userId") UUID userId, @Param("name") String name, Pageable pageable);

    @Modifying
    @Query("UPDATE Product p SET p.favoriteCount = p.favoriteCount + 1 WHERE p.id = :productId")
    void incrementFavoriteCount(@Param("productId") UUID productId);

    @Modifying
    @Query("UPDATE Product p SET p.favoriteCount = p.favoriteCount - 1 WHERE p.id = :productId")
    void decrementFavoriteCount(@Param("productId") UUID productId);
}
