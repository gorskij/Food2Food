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
public class Rating extends ReadOnlyEntity {

    @Column(name = "group_name")
    private String groupName;

    private String name;
//    @Override
//    public final boolean equals(Object o) {
//        if (this == o) {
//            return true;
//        }
//        if (!(o instanceof Rating rating)) {
//            return false;
//        }
//
//        return Objects.equals(getGroupName(), rating.getGroupName()) && Objects.equals(getName(), rating.getName());
//    }
//
//    @Override
//    public int hashCode() {
//        int result = Objects.hashCode(getGroupName());
//        result = 31 * result + Objects.hashCode(getName());
//        return result;
//    }
}
