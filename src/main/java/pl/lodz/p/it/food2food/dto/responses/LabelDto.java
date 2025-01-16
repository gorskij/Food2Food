package pl.lodz.p.it.food2food.dto.responses;

import java.util.Set;
import java.util.StringJoiner;
import java.util.UUID;

public record LabelDto(UUID id, Set<AllergenDto> allergens, String storage, String durability,
                       String instructionsAfterOpening, String preparation, byte[] image) {
    @Override
    public String toString() {
        return new StringJoiner(", ", LabelDto.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("allergens=" + allergens)
                .add("storage='" + storage + "'")
                .add("durability='" + durability + "'")
                .add("instructionsAfterOpening='" + instructionsAfterOpening + "'")
                .add("preparation='" + preparation + "'")
                .toString();
    }

}