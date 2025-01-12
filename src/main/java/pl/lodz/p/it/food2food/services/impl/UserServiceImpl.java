package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @PreAuthorize("permitAll()")
    @Override
    public User createUser(User newUser) throws CreationException, IdenticalFieldValueException {
        if (userRepository.existsByUsername(newUser.getUsername())) {
            String baseUsername = newUser.getUsername();
            String uniqueUsername = generateUniqueUsername(baseUsername);
            newUser.setUsername(uniqueUsername);
        }

        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new IdenticalFieldValueException(UserExceptionMessages.IDENTICAL_EMAIL, ErrorCodes.IDENTICAL_EMAIL);
        }

        try {
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new CreationException(UserExceptionMessages.CREATION_FAILED, ErrorCodes.REGISTRATION_ERROR);
        }
    }

    @PreAuthorize("permitAll()")
    private String generateUniqueUsername(String baseUsername) {
        String uniqueUsername = baseUsername;
        int counter = 1;
        while (userRepository.existsByUsername(uniqueUsername)) {
            uniqueUsername = baseUsername + counter;
            counter++;
        }
        return uniqueUsername;
    }

    @PreAuthorize("permitAll()")
    @Override
    public User getUserByGoogleId(String googleId) throws NotFoundException {
        return userRepository.findByGoogleId(googleId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }

    @PreAuthorize("permitAll()")
    @Override
    public User getUserByGithubId(String githubId) throws NotFoundException {
        return userRepository.findByGithubId(githubId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }

    @PreAuthorize("permitAll()")
    public User getUserById(UUID id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }
}
