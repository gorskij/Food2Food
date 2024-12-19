package pl.lodz.p.it.food2food.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.auth.GithubOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.GoogleOAuth2TokenPayload;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.User;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;

    @PreAuthorize("permitAll()")
    public Map<String, String> singInOAuth(GoogleOAuth2TokenPayload payload) {
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
            User newUser = new User(
                    username,
                    email
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
    public Map<String, String> singInGithubOAuth(GithubOAuth2TokenPayload payload) {
        try {
            User user = userService.getUserByGithubId(payload.id());

            String userToken = jwtService.createToken(user);

            return Map.of(
                    "token", userToken
            );
        } catch (NotFoundException e) {
            String email = payload.email();
            String username = (payload.username() != null && !payload.username().isEmpty())
                    ? payload.username()
                    : (email != null ? email.split("@")[0] : "github_user_" + payload.id());

            User newUser = new User(
                    username,
                    email
            );
            newUser.setGithubId(payload.id());

            User user = userService.createUser(newUser);
            String userToken = jwtService.createToken(user);

            return Map.of(
                    "token", userToken,
                    "created", "true"
            );
        }
    }
}
