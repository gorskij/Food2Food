package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.Rating;

import java.util.UUID;

@Transactional(propagation = Propagation.MANDATORY)
public interface RatingRepository extends JpaRepository<Rating, UUID> {
}
