package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;

@Getter
@NoArgsConstructor
@Entity
public class Label extends AbstractEntity {

    @ManyToMany
    @JoinTable(
            name = "label_allergen",
            joinColumns = @JoinColumn(name = "label_id"),
            inverseJoinColumns = @JoinColumn(name = "allergen_id")
    )
    private Set<Allergen> allergens;

    private String storage;

    private String durability;

    @Column(name = "instructions_after_opening")
    private String instructionsAfterOpening;

    private String preparation;

    @ToString.Exclude
    private byte[] image;
}
