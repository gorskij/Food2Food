package pl.lodz.p.it.food2food.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.lodz.p.it.food2food.exceptions.*;
import pl.lodz.p.it.food2food.model.AdministratorAccessLevel;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.AdministratorAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.UserService;
import pl.lodz.p.it.food2food.services.impl.AdministratorAccessLevelServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdministratorAccessLevelServiceTest {

    @Mock
    private AdministratorAccessLevelRepository administratorAccessLevelRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private AdministratorAccessLevelServiceImpl administratorAccessLevelService;

    private UUID userId;
    private UUID adminId;
    private User user;
    private AdministratorAccessLevel administratorAccessLevel;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        adminId = UUID.randomUUID();
        user = new User("testUser", "test@example.com", null);
        user.setId(userId);
        administratorAccessLevel = new AdministratorAccessLevel();
        administratorAccessLevel.setUser(user);
        administratorAccessLevel.setActive(true);
    }

    @Test
    void removeAdministratorAccessLevel_ValidRequest_ShouldDeactivateAccessLevel() {
        when(administratorAccessLevelRepository.findByUserId(userId))
                .thenReturn(Optional.of(administratorAccessLevel));
        when(userService.getUserRoles(userId))
                .thenReturn(List.of("USER", "ADMINISTRATOR"));
        when(administratorAccessLevelRepository.saveAndFlush(any(AdministratorAccessLevel.class)))
                .thenReturn(administratorAccessLevel);

        AdministratorAccessLevel result = assertDoesNotThrow(() ->
                administratorAccessLevelService.removeAdministratorAccessLevel(userId, adminId)
        );

        assertNotNull(result);
        assertFalse(result.isActive());
        verify(administratorAccessLevelRepository).saveAndFlush(administratorAccessLevel);
    }


    @Test
    void removeAdministratorAccessLevel_UserNotFound_ShouldThrowException() {
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> administratorAccessLevelService.removeAdministratorAccessLevel(userId, adminId));
    }

    @Test
    void removeAdministratorAccessLevel_OnlyAdministratorRole_ShouldThrowException() {
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.of(administratorAccessLevel));
        when(userService.getUserRoles(userId)).thenReturn(java.util.List.of("ADMINISTRATOR"));

        assertThrows(AccessLevelAlreadyTakenException.class, () -> administratorAccessLevelService.removeAdministratorAccessLevel(userId, adminId));
    }

    @Test
    void removeAdministratorAccessLevel_SelfRemoval_ShouldThrowException() {
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.of(administratorAccessLevel));
        when(userService.getUserRoles(userId)).thenReturn(java.util.List.of("USER", "ADMINISTRATOR"));

        assertThrows(AdministratorOwnRoleRemovalException.class, () -> administratorAccessLevelService.removeAdministratorAccessLevel(userId, userId));
    }

    @Test
    void removeAdministratorAccessLevel_AlreadyInactive_ShouldThrowException() {
        administratorAccessLevel.setActive(false);
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.of(administratorAccessLevel));

        assertThrows(AccessLevelAlreadyTakenException.class, () -> administratorAccessLevelService.removeAdministratorAccessLevel(userId, adminId));
    }

    @Test
    void addAdministratorAccessLevel_NewAdmin_ShouldActivateAccessLevel() {
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(administratorAccessLevelRepository.saveAndFlush(any(AdministratorAccessLevel.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        AdministratorAccessLevel result = assertDoesNotThrow(() ->
                administratorAccessLevelService.addAdministratorAccessLevel(userId)
        );

        assertNotNull(result);
        assertTrue(result.isActive());

        verify(administratorAccessLevelRepository).saveAndFlush(result);
    }


    @Test
    void addAdministratorAccessLevel_AlreadyActive_ShouldThrowException() {
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.of(administratorAccessLevel));

        assertThrows(AccessLevelAlreadyAssignedException.class, () -> administratorAccessLevelService.addAdministratorAccessLevel(userId));
    }

    @Test
    void addAdministratorAccessLevel_UserNotFound_ShouldThrowException() {
        when(administratorAccessLevelRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> administratorAccessLevelService.addAdministratorAccessLevel(userId));
    }
}
