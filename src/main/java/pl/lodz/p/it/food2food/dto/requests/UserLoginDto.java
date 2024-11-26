package pl.lodz.p.it.food2food.dto.requests;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record UserLoginDto(
        @NotBlank(message = "Login cannot be blank")
        String username,

        @NotBlank(message = "Password cannot be blank")
        String password
) implements Serializable {
}