package pl.lodz.p.it.food2food.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.PasswordHolder;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getByUsername(String login) throws RuntimeException {
        Optional<User> user = userRepository.findByUsername(login);

        if (user.isEmpty()) {
            throw new RuntimeException("User with given login does not exist");
        }

        return user.get();
    }

    public User createUser(User newUser, PasswordHolder password) {
        String encodedPassword = passwordEncoder.encode(password.password());
        newUser.setPassword(encodedPassword);
        return userRepository.save(newUser);
    }
}
