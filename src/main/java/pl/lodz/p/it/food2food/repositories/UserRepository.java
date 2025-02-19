package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.User;

import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(@NonNull String username);
    Optional<User> findByGoogleId(@NonNull String googleId);
    Optional<User> findByGithubId(@NonNull String githubId);
    boolean existsByUsername(@NonNull String username);
    boolean existsByEmail(@NonNull String email);

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @EntityGraph(attributePaths = {"username", "email", "blocked", "id", "accessLevels"})
    Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @EntityGraph(attributePaths = {"username", "email", "blocked", "id", "accessLevels"})
    Page<User> findAll(Pageable pageable);
}
