package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.util.UUID;

@Getter
@ToString
@MappedSuperclass
public abstract class ReadOnlyEntity {

    @Id
    @Column(name = "id", columnDefinition = "UUID", updatable = false)
    private UUID id;

    @Column(name = "version", nullable = false)
    @Version
    private Long version;
}
