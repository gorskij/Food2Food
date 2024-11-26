package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import jakarta.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@ToString
@Entity
public class Flavour extends AbstractEntity {

    @NotNull
    private String name;
}