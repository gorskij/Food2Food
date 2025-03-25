package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.lodz.p.it.food2food.dto.auth.GithubOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.GoogleOAuth2TokenPayload;
import pl.lodz.p.it.food2food.dto.auth.AuthResponse;
import pl.lodz.p.it.food2food.exceptions.*;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.repositories.AdministratorAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserAccessLevelRepository;
import pl.lodz.p.it.food2food.services.UserService;
import pl.lodz.p.it.food2food.services.impl.AuthServiceImpl;
import pl.lodz.p.it.food2food.services.impl.JwtService;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtService jwtService;

    @Mock
    private AdministratorAccessLevelRepository administratorAccessLevelRepository;

    @Mock
    private UserAccessLevelRepository userAccessLevelRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private UUID userId;
    private User user;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User("testUser", "test@example.com", new UserPreference());
        user.setId(userId);
    }

    @Test
    void signInGoogleOAuth_ExistingUser_ShouldReturnAuthResponse() throws Exception {
        GoogleOAuth2TokenPayload payload = new GoogleOAuth2TokenPayload(
                "https://accounts.google.com",
                "some-azp-value",
                "some-audience-value",
                "googleId",
                "test@example.com",
                true,
                "some-at-hash",
                "Test User",
                "https://some-url.com/picture.jpg",
                "Test",
                "User",
                1716923071,
                1716926671
        );
        when(userService.getUserByGoogleId(payload.sub())).thenReturn(user);
        user.setBlocked(false);
        when(jwtService.createToken(user, List.of())).thenReturn("token");

        AuthResponse response = authService.signInGoogleOAuth(payload);

        assertNotNull(response);
        assertEquals("token", response.token());
    }

    @Test
    void signInGoogleOAuth_BlockedUser_ShouldThrowException() throws NotFoundException {
        GoogleOAuth2TokenPayload payload = new GoogleOAuth2TokenPayload(
                "https://accounts.google.com",
                "some-azp-value",
                "some-audience-value",
                "googleId",
                "test@example.com",
                true,
                "some-at-hash",
                "Test User",
                "https://some-url.com/picture.jpg",
                "Test",
                "User",
                1716923071,
                1716926671
        );
        when(userService.getUserByGoogleId(payload.sub())).thenReturn(user);
        user.setBlocked(true);

        assertThrows(UserBlockedException.class, () -> authService.signInGoogleOAuth(payload));
    }

    @Test
    void signInGithubOAuth_NewUser_ShouldCreateUserAndReturnAuthResponse() throws Exception {
        GithubOAuth2TokenPayload payload = new GithubOAuth2TokenPayload(
                "githubId",
                "testUser",
                "test@example.com",
                "Test User"
        );
        when(userService.getUserByGithubId(payload.id())).thenThrow(new NotFoundException("notFound", "notFound"));
        when(userService.createUser(any(User.class))).thenReturn(user);
        when(jwtService.createToken(user, List.of())).thenReturn("token");

        AuthResponse response = authService.signInGithubOAuth(payload);

        assertNotNull(response);
        assertEquals("token", response.token());
    }

    @Test
    void signInGithubOAuth_ExistingUser_ShouldReturnAuthResponse() throws Exception {
        GithubOAuth2TokenPayload payload = new GithubOAuth2TokenPayload(
                "githubId",
                "testUser",
                "test@example.com",
                "Test User"
        );
        when(userService.getUserByGithubId(payload.id())).thenReturn(user);
        user.setBlocked(false);
        when(jwtService.createToken(user, List.of())).thenReturn("token");

        AuthResponse response = authService.signInGithubOAuth(payload);

        assertNotNull(response);
        assertEquals("token", response.token());
    }
}
