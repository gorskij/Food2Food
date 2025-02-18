package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.exceptions.AccessLevelAlreadyAssignedException;
import pl.lodz.p.it.food2food.exceptions.AccessLevelAlreadyTakenException;
import pl.lodz.p.it.food2food.exceptions.AdministratorOwnRoleRemovalException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.messages.AdministratorMessages;
import pl.lodz.p.it.food2food.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.AdministratorAccessLevel;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.AdministratorAccessLevelRepository;
import pl.lodz.p.it.food2food.repositories.UserRepository;
import pl.lodz.p.it.food2food.services.AdministratorAccessLevelService;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = NotFoundException.class, propagation = Propagation.REQUIRES_NEW)
public class AdministratorAccessLevelServiceImpl implements AdministratorAccessLevelService {
    private final AdministratorAccessLevelRepository administratorAccessLevelRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public AdministratorAccessLevel removeAdministratorAccessLevel(UUID id, UUID administratorId) throws NotFoundException, AdministratorOwnRoleRemovalException, AccessLevelAlreadyTakenException {
        AdministratorAccessLevel administrator = administratorAccessLevelRepository.findByUserId(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));

        if(userService.getUserRoles(administrator.getUser().getId()).size() <= 1){
            throw new AccessLevelAlreadyTakenException(UserExceptionMessages.ACCESS_LEVEL_TAKEN, ErrorCodes.ACCESS_LEVEL_TAKEN);
        }

        if(administrator.getUser().getId().equals(administratorId)){
            throw new AdministratorOwnRoleRemovalException(AdministratorMessages.OWN_ADMINISTRATOR_ROLE_REMOVAL, ErrorCodes.ADMINISTRATOR_OWN_ROLE_REMOVAL);
        }
        if (!administrator.isActive()){
            throw new AccessLevelAlreadyTakenException(UserExceptionMessages.ACCESS_LEVEL_TAKEN, ErrorCodes.ACCESS_LEVEL_TAKEN);
        }

        administrator.setActive(false);
        User user = administrator.getUser();

//        emailService.sendAdministratorPermissionLostEmail(user.getEmail(), user.getFirstName(), user.getLanguage());

        return administratorAccessLevelRepository.saveAndFlush(administrator);
    }

    @Override
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public AdministratorAccessLevel addAdministratorAccessLevel(UUID id) throws NotFoundException, AccessLevelAlreadyAssignedException {
        Optional<AdministratorAccessLevel> administratorOptional = administratorAccessLevelRepository.findByUserId(id);

        AdministratorAccessLevel administrator;
        if (administratorOptional.isPresent()) {
            administrator = administratorOptional.get();
        } else {
            User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
            administrator = new AdministratorAccessLevel();
            administrator.setUser(user);
        }

        if (administrator.isActive()) {
            throw new AccessLevelAlreadyAssignedException(UserExceptionMessages.ACCESS_LEVEL_ASSIGNED, ErrorCodes.ACCESS_LEVEL_ASSIGNED);
        }

        administrator.setActive(true);
        User user = administrator.getUser();

//        emailService.sendAdministratorPermissionGainedEmail(user.getEmail(), user.getFirstName(), user.getLanguage());

        return administratorAccessLevelRepository.saveAndFlush(administrator);
    }
}
