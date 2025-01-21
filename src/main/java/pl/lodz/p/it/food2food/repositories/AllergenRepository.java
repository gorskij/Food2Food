package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.Allergen;

import java.util.UUID;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface AllergenRepository extends JpaRepository<Allergen, UUID> {
}
