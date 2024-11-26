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
public class ProductIndex extends AbstractEntity {
    private String indexName;

    private Integer indexValue;
}