package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.food2food.model.UserPreference;

import java.util.Optional;
import java.util.UUID;

public interface UserPreferencesRepository extends JpaRepository<UserPreference, UUID> {
        Optional<UserPreference> findByUserId(UUID userId);
}
