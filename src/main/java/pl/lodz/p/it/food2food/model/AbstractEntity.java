package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "UUID", updatable = false)
    private UUID id;

    @Column(name = "version", nullable = false)
    @Version
    private Long version;

    @Column(name = "created_at", nullable = false, updatable = false)
    @ToString.Exclude
    private LocalDateTime createdAt;

    @Column(name = "modified_at", nullable = false)
    @Setter
    @ToString.Exclude
    private LocalDateTime modifiedAt;

    @Column(name = "created_by", updatable = false)
    @ToString.Exclude
    private UUID createdBy;

    @Column(name = "modified_by")
    @Setter
    @ToString.Exclude
    private UUID modifiedBy;

    @PrePersist
    public void onPrePersist() {
        this.createdAt = LocalDateTime.now();
        this.modifiedAt = LocalDateTime.now();
//        this.createdBy = getCurrentUserId();
//        this.modifiedBy = getCurrentUserId();
    }

    @PreUpdate
    public void onPreUpdate() {
        this.modifiedAt = LocalDateTime.now();
//        this.modifiedBy = getCurrentUserId();
    }
}
