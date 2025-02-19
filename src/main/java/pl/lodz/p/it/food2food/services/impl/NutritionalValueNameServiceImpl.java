package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.NutritionalValueName;
import pl.lodz.p.it.food2food.repositories.NutritionalValueNameRepository;
import pl.lodz.p.it.food2food.services.NutritionalValueNameService;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
@RequiredArgsConstructor
public class NutritionalValueNameServiceImpl implements NutritionalValueNameService {
    private final NutritionalValueNameRepository nutritionalValueNameRepository;

    @Override
    @PreAuthorize("hasRole('USER')")
    public List<NutritionalValueName> getAllNutritionalValueNames() {
        return nutritionalValueNameRepository.findAll();
    }
}
