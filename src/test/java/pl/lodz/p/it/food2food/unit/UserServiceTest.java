package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import pl.lodz.p.it.food2food.exceptions.*;
import pl.lodz.p.it.food2food.model.AdministratorAccessLevel;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.model.UserAccessLevel;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.repositories.AdministratorAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.impl.UserServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserAccessLevelRepository userAccessLevelRepository;
    @Mock
    private AdministratorAccessLevelRepository administratorAccessLevelRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;
    private UUID userId;
    private AdministratorAccessLevel administratorAccessLevel;
    private UserAccessLevel userAccessLevel;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User("testUser", "test@example.com", new UserPreference());
        user.setId(userId);
        administratorAccessLevel = new AdministratorAccessLevel();
        administratorAccessLevel.setUser(user);
        administratorAccessLevel.setActive(true);

        userAccessLevel = new UserAccessLevel();
        userAccessLevel.setUser(user);
        userAccessLevel.setActive(true);
    }

    @Test
    void getUserRoles_UserHasRoles_ShouldReturnRoles() {
        when(userAccessLevelRepository.findByUserIdAndActive(userId, true))
                .thenReturn(Optional.of(userAccessLevel));
        when(administratorAccessLevelRepository.findByUserIdAndActive(userId, true))
                .thenReturn(Optional.of(administratorAccessLevel));

        List<String> roles = userService.getUserRoles(userId);

        assertTrue(roles.contains("USER"));
        assertTrue(roles.contains("ADMINISTRATOR"));
    }

    @Test
    void getUserRoles_NoRoles_ShouldReturnEmptyList() {
        when(userAccessLevelRepository.findByUserIdAndActive(userId, true))
                .thenReturn(Optional.empty());
        when(administratorAccessLevelRepository.findByUserIdAndActive(userId, true))
                .thenReturn(Optional.empty());

        List<String> roles = userService.getUserRoles(userId);

        assertTrue(roles.isEmpty());
    }

    @Test
    void getAllUsers_WithUsernameFilter_ShouldReturnFilteredUsers() {
        Pageable pageable = mock(Pageable.class);
        Page<User> page = new PageImpl<>(List.of(user));
        when(userRepository.findByUsernameContainingIgnoreCase("test", pageable)).thenReturn(page);

        Page<User> result = userService.getAllUsers("test", pageable);

        assertEquals(1, result.getContent().size());
        assertEquals("testUser", result.getContent().get(0).getUsername());
    }

    @Test
    void blockUser_ValidUser_ShouldBlockUser() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertDoesNotThrow(() -> userService.blockUser(userId, UUID.randomUUID()));
        assertTrue(user.isBlocked());
        verify(userRepository).saveAndFlush(user);
    }

    @Test
    void blockUser_AlreadyBlocked_ShouldThrowException() {
        user.setBlocked(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertThrows(UserAlreadyBlockedException.class, () -> userService.blockUser(userId, UUID.randomUUID()));
    }

    @Test
    void blockUser_BlockingSelf_ShouldThrowException() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertThrows(AdministratorOwnBlockException.class, () -> userService.blockUser(userId, userId));
    }

    @Test
    void unblockUser_ValidUser_ShouldUnblockUser() {
        user.setBlocked(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertDoesNotThrow(() -> userService.unblockUser(userId));
        assertFalse(user.isBlocked());
        verify(userRepository).saveAndFlush(user);
    }

    @Test
    void unblockUser_AlreadyUnblocked_ShouldThrowException() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertThrows(UserAlreadyUnblockedException.class, () -> userService.unblockUser(userId));
    }

    @Test
    void changeLanguage_ValidUser_ShouldChangeLanguage() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertDoesNotThrow(() -> userService.changeLanguage(userId, "EN"));
        assertEquals("en", user.getLanguage().getValue());
        verify(userRepository).save(user);
    }

    @Test
    void changeLanguage_UserNotFound_ShouldThrowException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> userService.changeLanguage(userId, "EN"));
    }
}
