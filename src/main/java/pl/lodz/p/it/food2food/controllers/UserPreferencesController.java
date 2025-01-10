package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.food2food.dto.UserPreferencesDto;
import pl.lodz.p.it.food2food.services.UserPreferencesService;
import pl.lodz.p.it.food2food.services.impl.JwtService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/preferences")
public class UserPreferencesController {
    private final UserPreferencesService userPreferencesService;
    private final JwtService jwtService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public UserPreferencesDto getUserPreferences(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        UUID userId = UUID.fromString(jwtService.getUserId(token));
    }
}
