package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
@SecondaryTable(name = "personal_data", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
public class User extends AbstractEntity {
    @Setter
    @Column(name = "email", table = "personal_data", nullable = false, unique = true, length = 50)
    private String email;

    @Setter
    @Column(name = "temp_email", table = "personal_data", length = 50)
    private String temporaryEmail;

    @Setter
    @Column(name = "username", nullable = false, updatable = false, unique = true, length = 50)
    private String username;

    @Setter
    @Column(name = "password", length = 64)
    @ToString.Exclude
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<AccessLevel> accessLevels = new ArrayList<>();

    @OneToOne
    private UserPreference userPreference;

    @Setter
    @ManyToMany
    @JoinTable(
            name = "user_favorite_product",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> favoriteProducts = new HashSet<>();

    @Setter
    @ManyToOne
    private Theme theme;

    public User(String username,
                String email) {
        this.username = username;
        this.email = email;
        this.password = "";
    }
}
