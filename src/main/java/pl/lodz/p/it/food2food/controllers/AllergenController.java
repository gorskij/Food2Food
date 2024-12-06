package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.food2food.dto.responses.AllergenDto;
import pl.lodz.p.it.food2food.services.AllergenService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/allergens")
@RequiredArgsConstructor
public class AllergenController {
    private final AllergenService allergenService;

    @GetMapping
    public List<AllergenDto> getAllAllergens() {
        return allergenService.getAllAllergens();
    }
}
