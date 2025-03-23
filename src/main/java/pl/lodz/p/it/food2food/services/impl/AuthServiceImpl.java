package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.dto.auth.AuthResponse;
import pl.lodz.p.it.food2food.dto.auth.GithubOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.GoogleOAuth2TokenPayload;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.UserBlockedException;
import pl.lodz.p.it.food2food.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.repositories.AdministratorAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserAccessLevelRepository;
import pl.lodz.p.it.food2food.services.AuthService;
import pl.lodz.p.it.food2food.services.UserService;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AdministratorAccessLevelRepository administratorAccessLevelRepository;
    private final UserAccessLevelRepository userAccessLevelRepository;

    @Transactional(propagation = Propagation.MANDATORY)
    @PreAuthorize("permitAll()")
    public List<String> getUserRoles(User user) {
        List<String> roles = new ArrayList<>();

        administratorAccessLevelRepository.findByUserIdAndActive(user.getId(), true).ifPresent(admin -> roles.add("ADMINISTRATOR"));
        userAccessLevelRepository.findByUserIdAndActive(user.getId(), true).ifPresent(admin -> roles.add("USER"));

        return roles;
    }

    @PreAuthorize("permitAll()")
    @Transactional(rollbackFor = {IdenticalFieldValueException.class, CreationException.class, UserBlockedException.class})
    @Override
    public AuthResponse singInGoogleOAuth(GoogleOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException, UserBlockedException {
        try {
            User user = userService.getUserByGoogleId(payload.sub());

            if (user.isBlocked()) {
                throw new UserBlockedException(UserExceptionMessages.BLOCKED, ErrorCodes.USER_BLOCKED);
            }

            String userToken = jwtService.createToken(user, getUserRoles(user));
            return new AuthResponse(userToken, null, user.getLanguage().getValue());
        } catch (NotFoundException e) {
            String email = payload.email();
            String username = email.split("@")[0];
            UserPreference userPreference = new UserPreference();
            User newUser = new User(
                    username,
                    email,
                    userPreference
            );
            newUser.setGoogleId(payload.sub());

            User user = userService.createUser(newUser);
            String userToken = jwtService.createToken(user, getUserRoles(user));
            return new AuthResponse(userToken, "true", user.getLanguage().getValue());
        }
    }

    @PreAuthorize("permitAll()")
    @Transactional(rollbackFor = {IdenticalFieldValueException.class, CreationException.class, UserBlockedException.class})
    @Override
    public AuthResponse singInGithubOAuth(GithubOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException, UserBlockedException {
        try {
            User user = userService.getUserByGithubId(payload.id());

            if (user.isBlocked()) {
                throw new UserBlockedException(UserExceptionMessages.BLOCKED, ErrorCodes.USER_BLOCKED);
            }

            String userToken = jwtService.createToken(user, getUserRoles(user));
            return new AuthResponse(userToken, null, user.getLanguage().getValue());
        } catch (NotFoundException e) {
            User newUser = newUserFromGithubTokenPayload(payload);
            User user = userService.createUser(newUser);
            String userToken = jwtService.createToken(user, getUserRoles(user));
            return new AuthResponse(userToken, "true", user.getLanguage().getValue());
        }
    }

    @PreAuthorize("permitAll()")
    private User newUserFromGithubTokenPayload(GithubOAuth2TokenPayload payload) {
        String email = payload.email();
        String username = (payload.username() != null && !payload.username().isEmpty())
                ? payload.username()
                : (email != null ? email.split("@")[0] : "github_user_" + payload.id());
        UserPreference userPreference = new UserPreference();

        User newUser = new User(
                username,
                email,
                userPreference
        );
        newUser.setGithubId(payload.id());
        return newUser;
    }
}
