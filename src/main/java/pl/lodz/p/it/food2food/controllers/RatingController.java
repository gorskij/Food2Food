package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.food2food.dto.responses.RatingDto;
import pl.lodz.p.it.food2food.mappers.RatingMapper;
import pl.lodz.p.it.food2food.services.RatingService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/ratings")
@Transactional(propagation = Propagation.NEVER)
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;
    private final RatingMapper ratingMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<RatingDto>> getAllAllergens() {
        return ResponseEntity.ok(ratingService.getAllRatings().stream().map(ratingMapper::toRatingDto).collect(Collectors.toList()));
    }
}