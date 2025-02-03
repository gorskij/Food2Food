package pl.lodz.p.it.food2food.dto.requests;

import jakarta.validation.constraints.Pattern;

public record ChangeLanguageRequest(
        @Pattern(regexp = "en|pl", message = "Language must be either 'en' or 'pl'")
        String language
) {
}
