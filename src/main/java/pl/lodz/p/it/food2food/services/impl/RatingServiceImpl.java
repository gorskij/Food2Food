package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.Rating;
import pl.lodz.p.it.food2food.repositories.RatingRepository;
import pl.lodz.p.it.food2food.services.RatingService;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;

    @Override
    @PreAuthorize("hasRole('USER')")
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }
}
