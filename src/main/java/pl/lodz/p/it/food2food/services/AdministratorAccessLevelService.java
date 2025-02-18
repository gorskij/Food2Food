package pl.lodz.p.it.food2food.services;

import pl.lodz.p.it.food2food.exceptions.AccessLevelAlreadyAssignedException;
import pl.lodz.p.it.food2food.exceptions.AccessLevelAlreadyTakenException;
import pl.lodz.p.it.food2food.exceptions.AdministratorOwnRoleRemovalException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.model.AdministratorAccessLevel;

import java.util.UUID;

public interface AdministratorAccessLevelService {
    AdministratorAccessLevel addAdministratorAccessLevel(UUID id) throws NotFoundException, AccessLevelAlreadyAssignedException;

    AdministratorAccessLevel removeAdministratorAccessLevel(UUID id, UUID administratorId) throws NotFoundException, AdministratorOwnRoleRemovalException, AccessLevelAlreadyTakenException;
}
