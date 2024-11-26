package pl.lodz.p.it.food2food.dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record UserCreateDto(
        @NotBlank @Size(min = 8, max = 50, message = "Password length must be between 8 and 50.")
        String password,
        @Email(message = "Email should be valid.")

        @NotBlank(message = "Email cannot be blank.")
        @Size(min = 5, max = 50, message = "Email must be between 5 and 50 characters.")
        String email,

        @NotBlank(message = "Username cannot be blank.")
        @Size(min = 3, max = 50, message = "Login must be between 3 and 50 characters.")
        String username
) implements Serializable {
}
