package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "nutritional_value_group")
public class NutritionalValueGroup extends ReadOnlyEntity {

    private String groupName;
}
