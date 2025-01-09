package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.dto.responses.AllergenDto;
import pl.lodz.p.it.food2food.mappers.AllergenMapper;
import pl.lodz.p.it.food2food.repositories.AllergenRepository;
import pl.lodz.p.it.food2food.services.AllergenService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AllergenServiceImpl implements AllergenService {
    private final AllergenRepository allergenRepository;
    private final AllergenMapper allergenMapper;

    @Override
    public List<AllergenDto> getAllAllergens() {
        return allergenRepository.findAll().stream().map(allergenMapper::toAllergenDto).collect(Collectors.toList());
    }
}
