package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@ToString
@Entity
public class Product extends AbstractEntity {

    @Size(max = 13)
    private String ean;

    @ManyToOne
    private Producer producer;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_description")
    private String productDescription;

    @Column(name = "product_quantity")
    private Integer productQuantity;

    @Setter
    @Min(value = 0, message = "The value must be positive")
    @NotNull
    @Column(name = "favorite_count", nullable = false)
    private Integer favoriteCount;

    @ManyToOne
    private Unit unit;

    @ManyToOne
    private PackageType packageType;

    @Column(name = "country", length = Integer.MAX_VALUE)
    private String country;

    @OneToOne
    private Composition composition;

    @ManyToMany
    @JoinTable(
            name = "product_nutritional_index",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "nutritional_index_id")
    )
    private Set<NutritionalIndex> nutritionalIndexes;

    @ManyToMany
    @JoinTable(
            name = "product_product_index",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "product_index_id")
    )
    private Set<ProductIndex> productIndexes;

    @OneToOne
    private Label label;

    @OneToOne
    private Portion portion;

    @ManyToMany
    @JoinTable(
            name = "product_rating",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "rating_id")
    )
    private Set<Rating> ratings;

    @ManyToMany
    @JoinTable(
            name = "product_nutritional_value",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "nutritional_value_id")
    )
    private List<NutritionalValue> nutritionalValues;
}
