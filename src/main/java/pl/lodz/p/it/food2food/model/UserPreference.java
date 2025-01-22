package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class UserPreference extends AbstractEntity {

    @ManyToMany
    @JoinTable(
            name = "user_preference_positive_package_type",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "package_type_id")
    )
    private Set<PackageType> positivePackageTypes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_preference_negative_package_type",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "package_type_id")
    )
    private Set<PackageType> negativePackageTypes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_preference_allergen",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "allergen_id")
    )
    private Set<Allergen> allergens = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_preference_positive_rating",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "rating_id")
    )
    private Set<Rating> positiveRatings = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_preference_negative_rating",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "rating_id")
    )
    private Set<Rating> negativeRatings = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_preference_positive_nutritional_value_name",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "nutritional_value_name_id")
    )
    private Set<NutritionalValueName> positiveNutritionalValueNames = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_preference_negative_nutritional_value_name",
            joinColumns = @JoinColumn(name = "user_preference_id"),
            inverseJoinColumns = @JoinColumn(name = "nutritional_value_name_id")
    )
    private Set<NutritionalValueName> negativeNutritionalValueNames = new HashSet<>();
}

