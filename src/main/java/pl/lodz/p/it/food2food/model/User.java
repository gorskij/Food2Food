package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "users")
@SecondaryTable(name = "personal_data", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
@SecondaryTable(name = "google_auth", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
@SecondaryTable(name = "github_auth", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
public class User extends AbstractEntity {
    @Setter
    @Column(name = "google_id", table = "google_auth", unique = true)
    private String googleId;

    @Setter
    @Column(name = "github_id", table = "github_auth", unique = true)
    private String githubId;

    @Setter
    @Column(name = "email", table = "personal_data", nullable = false, length = 50)
    private String email;

    @Setter
    @Column(name = "username", nullable = false, updatable = false, unique = true, length = 50)
    private String username;

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
                String email, UserPreference userPreference) {
        this.username = username;
        this.email = email;
        this.userPreference = userPreference;
    }
}
