package pl.lodz.p.it.food2food.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Objects;

@Getter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "product_index")
public class ProductIndex extends ReadOnlyEntity {
    private String indexName;

    private Integer indexValue;

//    @Override
//    public final boolean equals(Object o) {
//        if (this == o) {
//            return true;
//        }
//        if (!(o instanceof ProductIndex that)) {
//            return false;
//        }
//
//        return Objects.equals(getIndexName(), that.getIndexName()) && Objects.equals(getIndexValue(), that.getIndexValue());
//    }
//
//    @Override
//    public int hashCode() {
//        int result = Objects.hashCode(getIndexName());
//        result = 31 * result + Objects.hashCode(getIndexValue());
//        return result;
//    }
}