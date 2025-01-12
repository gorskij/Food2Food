package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.food2food.model.Rating;

import java.util.UUID;

public interface RatingRepository extends JpaRepository<Rating, UUID> {
}
