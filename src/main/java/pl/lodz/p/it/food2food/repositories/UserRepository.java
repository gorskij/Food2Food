package pl.lodz.p.it.food2food.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import pl.lodz.p.it.food2food.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @NonNull
    Optional<User> getByUsername(@NonNull String username);
}
