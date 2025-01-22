package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.p.it.food2food.dto.requests.UserPreferenceRequest;
import pl.lodz.p.it.food2food.dto.responses.UserPreferenceResponse;
import pl.lodz.p.it.food2food.exceptions.ApplicationOptimisticLockException;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.mappers.UserPreferenceMapper;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.services.UserPreferenceService;
import pl.lodz.p.it.food2food.utils.EtagSigner;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Transactional(propagation = Propagation.NEVER)
@RequestMapping("/api/v1/user-preference")
public class UserPreferenceController {
    private final UserPreferenceService userPreferenceService;
    private final UserPreferenceMapper userPreferenceMapper;
    private final EtagSigner signer;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ResponseEntity<UserPreferenceResponse> getUserPreference() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();

        try {
            UserPreference userPreference = userPreferenceService.getUserPreference(userId);
            UserPreferenceResponse userPreferenceDto = userPreferenceMapper.toUserPreferenceResponse(userPreference);
            return ResponseEntity.ok().eTag(signer.generateSignature(userPreference.getId(), userPreference.getVersion())).body(userPreferenceDto);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping()
    public ResponseEntity<UserPreferenceResponse> updateUserPreference(
            @RequestBody UserPreferenceRequest newUserPreference,
            @RequestHeader(HttpHeaders.IF_MATCH) String tagValue) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();

        try {
            UserPreference updatedUserPreference = userPreferenceService.updateUserPreference(userId, newUserPreference, tagValue);

            String newETag = signer.generateSignature(updatedUserPreference.getId(), updatedUserPreference.getVersion());

            return ResponseEntity.ok()
                    .eTag(newETag)
                    .body(userPreferenceMapper.toUserPreferenceResponse(updatedUserPreference));
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ApplicationOptimisticLockException e) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        }
    }
}
