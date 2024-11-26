package pl.lodz.p.it.food2food.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serial;
import java.io.Serializable;

@Entity
@DiscriminatorValue("ADMINISTRATOR")
@Table(name = "administrator")
public class AdministratorAccessLevel extends AccessLevel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
