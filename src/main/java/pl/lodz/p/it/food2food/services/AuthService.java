package pl.lodz.p.it.food2food.services;

import org.springframework.security.access.prepost.PreAuthorize;
import pl.lodz.p.it.food2food.dto.auth.GithubOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.GoogleOAuth2TokenPayload;
import pl.lodz.p.it.food2food.exceptions.CreationException;
import pl.lodz.p.it.food2food.exceptions.IdenticalFieldValueException;

import java.util.Map;

public interface AuthService {
    @PreAuthorize("permitAll()")
    Map<String, String> singInGoogleOAuth(GoogleOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException;

    @PreAuthorize("permitAll()")
    Map<String, String> singInGithubOAuth(GithubOAuth2TokenPayload payload) throws CreationException, IdenticalFieldValueException;
}
