package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Entity
public class Addition extends AbstractEntity {

    private Integer addition_number;
}
