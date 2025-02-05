package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;

@Setter
@Entity
@Getter
@NoArgsConstructor
@Table(
        name = "access_level",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "level"})
        },
        indexes = {
                @Index(name = "idx_access_level_user_id", columnList = "user_id")
        })
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING, name = "level")
@ToString
public abstract class AccessLevel extends AbstractMutableEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Column(name = "active", nullable = false)
    private boolean active;

    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ToString.Exclude
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    private User user;

    @Column(insertable = false, updatable = false)
    private String level;
}
