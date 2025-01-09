package pl.lodz.p.it.food2food.services;

import pl.lodz.p.it.food2food.dto.responses.AllergenDto;

import java.util.List;

public interface AllergenService {
    List<AllergenDto> getAllAllergens();
}
