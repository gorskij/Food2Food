package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Entity
public class Addition extends AbstractEntity {

    private Integer addition_number;
}
