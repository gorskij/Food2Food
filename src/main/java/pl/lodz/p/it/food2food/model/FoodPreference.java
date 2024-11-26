package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class FoodPreference extends AbstractEntity {
    @ManyToMany
    @JoinTable(
            name = "food_preference_allergen",
            joinColumns = @JoinColumn(name = "food_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "allergen_id")
    )
    private Set<Allergen> allergens;


}
