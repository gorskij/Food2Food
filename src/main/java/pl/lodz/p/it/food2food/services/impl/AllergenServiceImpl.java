package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.Allergen;
import pl.lodz.p.it.food2food.repositories.AllergenRepository;
import pl.lodz.p.it.food2food.services.AllergenService;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
@RequiredArgsConstructor
public class AllergenServiceImpl implements AllergenService {
    private final AllergenRepository allergenRepository;

    @Override
    @PreAuthorize("hasRole('USER')")
    public List<Allergen> getAllAllergens() {
        return allergenRepository.findAll();
    }
}
