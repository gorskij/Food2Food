package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@MappedSuperclass
public abstract class AbstractMutableEntity extends AbstractEntity {
    @Column(name = "created_at", nullable = false, updatable = false)
    @ToString.Exclude
    private LocalDateTime createdAt;

    @Column(name = "modified_at", nullable = false)
    @Setter
    @ToString.Exclude
    private LocalDateTime modifiedAt;

    @PrePersist
    public void onPrePersist() {
        this.createdAt = LocalDateTime.now();
        this.modifiedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onPreUpdate() {
        this.modifiedAt = LocalDateTime.now();
    }
}
