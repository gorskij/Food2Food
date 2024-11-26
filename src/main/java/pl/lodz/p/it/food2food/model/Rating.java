package pl.lodz.p.it.food2food.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Objects;
import java.util.Set;

@Getter
@NoArgsConstructor
@ToString
@Entity
public class Rating extends AbstractEntity {

    @Column(name = "group_name")
    private String groupName;

    private String name;
}
