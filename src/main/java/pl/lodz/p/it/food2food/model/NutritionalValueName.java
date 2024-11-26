package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "nutritional_value_name")
public class NutritionalValueName extends AbstractEntity {

    @ManyToOne
    private NutritionalValueGroup group;

    private String name;
}
