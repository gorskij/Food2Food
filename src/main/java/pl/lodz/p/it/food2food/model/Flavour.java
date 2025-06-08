package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.ToString;
import jakarta.validation.constraints.NotNull;

@Getter
@ToString
@Entity
public class Flavour extends AbstractEntity {

    @NotNull
    private String name;
}