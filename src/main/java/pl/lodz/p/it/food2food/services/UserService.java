package pl.lodz.p.it.food2food.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;

import java.util.UUID;

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
    public User getUserByGoogleId(String googleId) throws NotFoundException {
        return userRepository.findByGoogleId(googleId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }
    @PreAuthorize("permitAll()")
    public User getUserByGithubId(String githubId) throws NotFoundException {
        return userRepository.findByGithubId(githubId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }

    @PreAuthorize("permitAll()")
    public User getUserById(UUID id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }
}
