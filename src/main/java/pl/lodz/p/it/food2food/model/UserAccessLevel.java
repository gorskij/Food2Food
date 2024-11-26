package pl.lodz.p.it.food2food.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.io.Serial;
import java.io.Serializable;

@Entity
@DiscriminatorValue("USER")
public class UserAccessLevel extends AccessLevel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
