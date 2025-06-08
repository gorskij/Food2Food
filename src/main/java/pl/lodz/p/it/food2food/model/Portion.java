package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Entity
public class Portion extends AbstractEntity {

    private Integer portionQuantity;

    @ManyToOne
    private Unit unit;
}
