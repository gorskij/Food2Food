package pl.lodz.p.it.food2food.services;

import pl.lodz.p.it.food2food.exceptions.ApplicationOptimisticLockException;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.User;

import java.util.UUID;

public interface UserService {
    User createUser(User newUser) throws CreationException, IdenticalFieldValueException;

    User getUserByGoogleId(String googleId) throws NotFoundException;

    User getUserByGithubId(String githubId) throws NotFoundException;

    String changeLanguage(UUID id, String language) throws NotFoundException;
}
