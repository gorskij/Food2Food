package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.food2food.dto.responses.AllergenDto;
import pl.lodz.p.it.food2food.mappers.AllergenMapper;
import pl.lodz.p.it.food2food.services.AllergenService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/allergens")
@RequiredArgsConstructor
public class AllergenController {
    private final AllergenService allergenService;
    private final AllergenMapper allergenMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<AllergenDto>> getAllAllergens() {
        return ResponseEntity.ok(allergenService.getAllAllergens().stream().map(allergenMapper::toAllergenDto).collect(Collectors.toList()));
    }
}
