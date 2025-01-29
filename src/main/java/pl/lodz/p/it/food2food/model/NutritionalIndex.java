package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "nutritional_index")
public class NutritionalIndex extends AbstractEntity {

    @Column(name = "index_value")
    private Integer indexValue;

    private String legend;
}