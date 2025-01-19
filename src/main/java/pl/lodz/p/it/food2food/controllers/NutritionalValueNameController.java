package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.food2food.dto.responses.NutritionalValueNameDto;
import pl.lodz.p.it.food2food.mappers.NutritionalValueNameMapper;
import pl.lodz.p.it.food2food.services.NutritionalValueNameService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/nutritional-value-names")
@Transactional(propagation = Propagation.NEVER)
@RequiredArgsConstructor
public class NutritionalValueNameController {
    private final NutritionalValueNameService nutritionalValueNameService;
    private final NutritionalValueNameMapper nutritionalValueNameMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<NutritionalValueNameDto>> getAllNutritionalValueNames() {
        return ResponseEntity.ok(nutritionalValueNameService.getAllNutritionalValueNames().stream().map(nutritionalValueNameMapper::toNutritionalValueNameDto).collect(Collectors.toList()));
    }
}
