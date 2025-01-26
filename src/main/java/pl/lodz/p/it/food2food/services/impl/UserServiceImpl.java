package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserAccessLevel;
import pl.lodz.p.it.food2food.repositories.UserAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserAccessLevelRepository userAccessLevelRepository;

    @Override
    @PreAuthorize("permitAll()")
    @Transactional(rollbackFor = {IdenticalFieldValueException.class}, propagation = Propagation.MANDATORY)
    public User createUser(User newUser) throws CreationException, IdenticalFieldValueException {
        UserAccessLevel newUserAccessLevel = new UserAccessLevel();
        newUserAccessLevel.setActive(true);
        newUserAccessLevel.setUser(newUser);

        if (userRepository.existsByUsername(newUser.getUsername())) {
            String baseUsername = newUser.getUsername();
            String uniqueUsername = generateUniqueUsername(baseUsername);
            newUser.setUsername(uniqueUsername);
        }

        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new IdenticalFieldValueException(UserExceptionMessages.IDENTICAL_EMAIL, ErrorCodes.IDENTICAL_EMAIL);
        }
        UserAccessLevel userAccesslevel;
        try {
            userAccesslevel = userAccessLevelRepository.saveAndFlush(newUserAccessLevel);
            return userAccesslevel.getUser();
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
    @Transactional(propagation = Propagation.MANDATORY)
    @Override
    public User getUserByGoogleId(String googleId) throws NotFoundException {
        return userRepository.findByGoogleId(googleId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }

    @PreAuthorize("permitAll()")
    @Transactional(propagation = Propagation.MANDATORY)
    @Override
    public User getUserByGithubId(String githubId) throws NotFoundException {
        return userRepository.findByGithubId(githubId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }
}
