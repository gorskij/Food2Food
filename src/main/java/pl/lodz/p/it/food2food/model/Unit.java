package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Entity
public class Unit extends AbstractEntity {

    @NotNull
    private String name;
}