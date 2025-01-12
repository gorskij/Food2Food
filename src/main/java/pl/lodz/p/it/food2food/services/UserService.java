package pl.lodz.p.it.food2food.services;

import org.springframework.security.access.prepost.PreAuthorize;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.User;

public interface UserService {
    @PreAuthorize("permitAll()")
    User createUser(User newUser) throws CreationException, IdenticalFieldValueException;

    @PreAuthorize("permitAll()")
    User getUserByGoogleId(String googleId) throws NotFoundException;

    @PreAuthorize("permitAll()")
    User getUserByGithubId(String githubId) throws NotFoundException;
}
