package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Entity
public class Allergen extends ReadOnlyEntity {

    @NotNull
    private String name;
}
