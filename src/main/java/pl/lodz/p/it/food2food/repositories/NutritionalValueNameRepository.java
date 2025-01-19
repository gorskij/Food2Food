package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.food2food.model.NutritionalValueName;

import java.util.UUID;

public interface NutritionalValueNameRepository extends JpaRepository<NutritionalValueName, UUID> {
}
