package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.UserAccessLevel;

import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface UserAccessLevelRepository extends JpaRepository<UserAccessLevel, UUID> {
    @PreAuthorize("permitAll()")
    Optional<UserAccessLevel> findByUserIdAndActive(UUID id, boolean active);
}
