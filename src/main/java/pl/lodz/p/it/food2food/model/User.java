package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
    @Column(name = "user_name", table = "personal_data", nullable = false, unique = true, length = 50)
    private String userName;

    @Setter
    @Column(name = "temp_email", table = "personal_data", length = 50)
    private String temporaryEmail;

    @Setter
    @Column(name = "password", length = 64)
    @ToString.Exclude
    private String password;
}
