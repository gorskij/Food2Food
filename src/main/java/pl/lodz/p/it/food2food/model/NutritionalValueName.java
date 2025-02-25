package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "nutritional_value_name")
public class NutritionalValueName extends AbstractEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    private NutritionalValueGroup group;

    private String name;
}
