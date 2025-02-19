package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.p.it.food2food.exceptions.AccessLevelAlreadyAssignedException;
import pl.lodz.p.it.food2food.exceptions.AccessLevelAlreadyTakenException;
import pl.lodz.p.it.food2food.exceptions.AdministratorOwnRoleRemovalException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.services.AdministratorAccessLevelService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admins")
@RequiredArgsConstructor
@Transactional(propagation = Propagation.NEVER)
public class AdministratorController {

    private final AdministratorAccessLevelService administratorAccessLevelService;

    @PutMapping(path = "/{id}/remove-role")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<Void> removeAccessLevel(@PathVariable UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID administratorId = (UUID) authentication.getPrincipal();

        try {
            administratorAccessLevelService.removeAdministratorAccessLevel(id, administratorId);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (AdministratorOwnRoleRemovalException | AccessLevelAlreadyTakenException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/{id}/add-role")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<Void> addAccessLevel(@PathVariable UUID id) {
        try {
            administratorAccessLevelService.addAdministratorAccessLevel(id);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (AccessLevelAlreadyAssignedException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

        return ResponseEntity.ok().build();
    }
}