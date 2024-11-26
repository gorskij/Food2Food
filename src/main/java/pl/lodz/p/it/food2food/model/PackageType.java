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
@Table(name = "package_type")
public class PackageType extends AbstractEntity {

    @Column(name = "name")
    private String name;

}
