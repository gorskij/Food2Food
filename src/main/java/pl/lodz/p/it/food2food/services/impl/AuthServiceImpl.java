package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.dto.auth.GithubOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.GoogleOAuth2TokenPayload;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.services.AuthService;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final JwtService jwtService;

    @PreAuthorize("permitAll()")
    @Override
    public Map<String, String> singInGoogleOAuth(GoogleOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException {
        try {
            User user = userService.getUserByGoogleId(payload.sub());

            String userToken = jwtService.createToken(user);

            return Map.of(
                    "token", userToken
//                    "theme", theme
            );

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
            String userToken = jwtService.createToken(user);

            return Map.of(
                    "token", userToken,
                    "created", "true"
            );
        }
    }

    @PreAuthorize("permitAll()")
    @Override
    public Map<String, String> singInGithubOAuth(GithubOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException {
        try {
            User user = userService.getUserByGithubId(payload.id());

            String userToken = jwtService.createToken(user);

            return Map.of(
                    "token", userToken
            );
        } catch (NotFoundException e) {
            User newUser = newUserFromGithubTokenPayload(payload);

            User user = userService.createUser(newUser);
            String userToken = jwtService.createToken(user);

            return Map.of(
                    "token", userToken,
                    "created", "true"
            );
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
