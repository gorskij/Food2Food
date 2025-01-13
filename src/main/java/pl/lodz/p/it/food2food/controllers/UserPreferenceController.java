package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.p.it.food2food.dto.UserPreferenceDto;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.mappers.UserPreferenceMapper;
import pl.lodz.p.it.food2food.model.UserPreference;
import pl.lodz.p.it.food2food.services.UserPreferenceService;
import pl.lodz.p.it.food2food.services.impl.JwtService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/preference")
public class UserPreferenceController {
    private final UserPreferenceService userPreferenceService;
    private final UserPreferenceMapper userPreferenceMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ResponseEntity<UserPreferenceDto> getUserPreference() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = (String) authentication.getPrincipal();
        UUID userId = UUID.fromString(userIdString);
        try {
            UserPreference userPreference = userPreferenceService.getUserPreference(userId);
            UserPreferenceDto userPreferenceDto = userPreferenceMapper.toUserPreferenceDto(userPreference);
            return ResponseEntity.ok(userPreferenceDto);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping()
    public ResponseEntity<UserPreferenceDto> updateUserPreference(
            @RequestBody UserPreferenceDto newUserPreference) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = (String) authentication.getPrincipal();
        UUID userId = UUID.fromString(userIdString);
        try {
            return ResponseEntity.ok(
                    userPreferenceMapper.toUserPreferenceDto(
                            userPreferenceService.updateUserPreference(
                                    userId, newUserPreference)));
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }
}
