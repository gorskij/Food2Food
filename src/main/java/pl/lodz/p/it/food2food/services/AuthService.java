package pl.lodz.p.it.food2food.services;

import org.springframework.security.access.prepost.PreAuthorize;
import pl.lodz.p.it.food2food.dto.auth.AuthResponse;
import pl.lodz.p.it.food2food.dto.auth.GithubOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.GoogleOAuth2TokenPayload;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;
import pl.lodz.p.it.food2food.exceptions.UserBlockedException;

public interface AuthService {
    @PreAuthorize("permitAll()")
    AuthResponse signInGoogleOAuth(GoogleOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException, UserBlockedException;

    @PreAuthorize("permitAll()")
    AuthResponse signInGithubOAuth(GithubOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException, UserBlockedException;
}
