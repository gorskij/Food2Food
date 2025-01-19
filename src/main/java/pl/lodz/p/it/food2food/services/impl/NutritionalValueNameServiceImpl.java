package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.model.NutritionalValueName;
import pl.lodz.p.it.food2food.repositories.NutritionalValueNameRepository;
import pl.lodz.p.it.food2food.services.NutritionalValueNameService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NutritionalValueNameServiceImpl implements NutritionalValueNameService {
    private final NutritionalValueNameRepository nutritionalValueNameRepository;

    @Override
    public List<NutritionalValueName> getAllNutritionalValueNames() {
        return nutritionalValueNameRepository.findAll();
    }
}
