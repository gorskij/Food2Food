package pl.lodz.p.it.food2food.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.UUID;

@Entity(name = "themes")
@Getter
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "type", nullable = false, updatable = false, length = 50)
    private String type;
}