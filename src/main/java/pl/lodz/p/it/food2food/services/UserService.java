package pl.lodz.p.it.food2food.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.exceptions.*;
import pl.lodz.p.it.food2food.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    void blockUser(UUID id, UUID administratorId) throws NotFoundException, UserAlreadyBlockedException, AdministratorOwnBlockException;

    @Transactional(rollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    void unblockUser(UUID id) throws NotFoundException, UserAlreadyUnblockedException;

    User createUser(User newUser) throws CreationException, IdenticalFieldValueException;

    User getUserByGoogleId(String googleId) throws NotFoundException;

    User getUserByGithubId(String githubId) throws NotFoundException;

    String changeLanguage(UUID id, String language) throws NotFoundException;

    List<String> getUserRoles(UUID id);

    Page<User> getAllUsers(String username, Pageable pageable);
}
