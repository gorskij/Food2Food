package pl.lodz.p.it.food2food.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

//    TODO: exception handling
    @PreAuthorize("permitAll()")
    public User createUser(User newUser) {
        return userRepository.save(newUser);
    }

    @PreAuthorize("permitAll()")
    public User getUserByGoogleId(String googleId)  {
        return userRepository.findByGoogleId(googleId).orElseThrow(RuntimeException :: new);
    }
    @PreAuthorize("permitAll()")
    public User getUserByGithubId(String githubId) {
        return userRepository.findByGithubId(githubId).orElseThrow(RuntimeException :: new);
    }
}
