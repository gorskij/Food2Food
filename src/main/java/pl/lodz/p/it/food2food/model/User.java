package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

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
    private FoodPreference foodPreference;

    @Setter
    @ManyToOne
    private Theme theme;



    public User(String username,
                String email) {
        this.username = username;
        this.email = email;
        this.password = "";
    }
//    @Enumerated(EnumType.STRING)
//    @Column(name = "language", nullable = false)
//    private Language language = Language.EN;

//    @Setter
//    @Column(name = "verified", nullable = false)
//    private boolean verified = false;

//    @Setter
//    private UserPreference userPreference;
}
