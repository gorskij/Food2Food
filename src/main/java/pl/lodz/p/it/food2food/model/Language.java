package pl.lodz.p.it.food2food.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Language {
    PL("pl"), EN("en");
    private final String value;
}

