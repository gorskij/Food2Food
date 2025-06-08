package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Entity
@Table(name = "nutritional_value")
public class NutritionalValue extends AbstractEntity {

    @ManyToOne
    private NutritionalValueName nutritionalValueName;

    private Double quantity;

    @ManyToOne
    private Unit unit;

    private Double nrv;

}

