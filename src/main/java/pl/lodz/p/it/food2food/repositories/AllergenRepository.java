package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.food2food.model.Allergen;

import java.util.UUID;

public interface AllergenRepository extends JpaRepository<Allergen, UUID> {
}
