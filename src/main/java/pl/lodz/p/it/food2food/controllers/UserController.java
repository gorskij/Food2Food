package pl.lodz.p.it.food2food.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.p.it.food2food.dto.requests.ChangeLanguageRequest;
import pl.lodz.p.it.food2food.dto.responses.ChangeLanguageResponse;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/me/language")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ChangeLanguageResponse> changeLanguage(
            @RequestBody @Valid ChangeLanguageRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID userId = (UUID) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(new ChangeLanguageResponse(userService.changeLanguage(userId, request.language().toUpperCase())));
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }
}
