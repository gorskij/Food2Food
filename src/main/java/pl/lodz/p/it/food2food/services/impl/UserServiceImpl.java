package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.exceptions.*;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.messages.AdministratorMessages;
import pl.lodz.p.it.food2food.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.Language;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserAccessLevel;
import pl.lodz.p.it.food2food.repositories.AdministratorAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserAccessLevelRepository userAccessLevelRepository;
    private final AdministratorAccessLevelRepository administratorAccessLevelRepository;

    @Override
    @Transactional(propagation = Propagation.MANDATORY)
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public List<String> getUserRoles(UUID id) {
        List<String> roles = new ArrayList<>();
        administratorAccessLevelRepository.findByUserIdAndActive(id, true).ifPresent(administrator -> roles.add("ADMINISTRATOR"));
        userAccessLevelRepository.findByUserIdAndActive(id, true).ifPresent(owner -> roles.add("USER"));

        return roles;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public Page<User> getAllUsers(String username, Pageable pageable) {
        if (username != null && !username.isEmpty()) {
            return userRepository.findByUsernameContainingIgnoreCase(username, pageable);
        } else {
            return userRepository.findAll(pageable);
        }
    }

    @Override
    @Transactional(rollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public void blockUser(UUID id, UUID administratorId) throws NotFoundException, UserAlreadyBlockedException, AdministratorOwnBlockException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));

        if(user.getId().equals(administratorId)) {
            throw new AdministratorOwnBlockException(AdministratorMessages.OWN_ADMINISTRATOR_BLOCK, ErrorCodes.ADMINISTRATOR_OWN_BLOCK);
        }

        if (user.isBlocked()) {
            throw new UserAlreadyBlockedException(UserExceptionMessages.ALREADY_BLOCKED, ErrorCodes.USER_ALREADY_BLOCKED);
        }
        user.setBlocked(true);
        userRepository.saveAndFlush(user);
    }

    @Override
    @Transactional(rollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public void unblockUser(UUID id) throws NotFoundException, UserAlreadyUnblockedException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        if (!user.isBlocked()) {
            throw new UserAlreadyUnblockedException(UserExceptionMessages.ALREADY_UNBLOCKED, ErrorCodes.USER_ALREADY_UNBLOCKED);
        }
        user.setBlocked(false);
        userRepository.saveAndFlush(user);
    }

    @Override
    @PreAuthorize("permitAll()")
    @Transactional(propagation = Propagation.MANDATORY)
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

    @Override
    @PreAuthorize("permitAll()")
    @Transactional(propagation = Propagation.MANDATORY)
    public User getUserByGoogleId(String googleId) throws NotFoundException {
        return userRepository.findByGoogleId(googleId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }

    @Override
    @PreAuthorize("permitAll()")
    @Transactional(propagation = Propagation.MANDATORY)
    public User getUserByGithubId(String githubId) throws NotFoundException {
        return userRepository.findByGithubId(githubId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
    }

    @Override
    @Transactional(rollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
    @PreAuthorize("isAuthenticated()")
    public String changeLanguage(UUID id, String language) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));

        user.setLanguage(Language.valueOf(language));
        userRepository.save(user);

        return user.getLanguage().getValue();
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
}
