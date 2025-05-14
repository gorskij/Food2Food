package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@ToString
@Entity
public class Product extends AbstractEntity {

    @Size(max = 13)
    private String ean;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
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

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Unit unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private PackageType packageType;

    @Column(name = "country", length = Integer.MAX_VALUE)
    private String country;

    @OneToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Composition composition;

    @ManyToMany
    @JoinTable(
            name = "product_nutritional_index",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "nutritional_index_id")
    )
    @ToString.Exclude
    private Set<NutritionalIndex> nutritionalIndexes;

    @ManyToMany
    @JoinTable(
            name = "product_product_index",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "product_index_id")
    )
    @ToString.Exclude
    private Set<ProductIndex> productIndexes;

    @OneToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Label label;

    @OneToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Portion portion;

    @ManyToMany
    @JoinTable(
            name = "product_rating",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "rating_id")
    )
    @ToString.Exclude
    private Set<Rating> ratings;

    @ManyToMany
    @JoinTable(
            name = "product_nutritional_value",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "nutritional_value_id")
    )
    @ToString.Exclude
    private List<NutritionalValue> nutritionalValues;
}
