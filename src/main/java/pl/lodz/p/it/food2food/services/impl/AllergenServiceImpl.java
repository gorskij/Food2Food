package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.dto.responses.AllergenDto;
import pl.lodz.p.it.food2food.mappers.AllergenMapper;
import pl.lodz.p.it.food2food.model.Allergen;
import pl.lodz.p.it.food2food.repositories.AllergenRepository;
import pl.lodz.p.it.food2food.services.AllergenService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
@RequiredArgsConstructor
public class AllergenServiceImpl implements AllergenService {
    private final AllergenRepository allergenRepository;
    private final AllergenMapper allergenMapper;

    @Override
    public List<Allergen> getAllAllergens() {
        return allergenRepository.findAll();
    }
}
