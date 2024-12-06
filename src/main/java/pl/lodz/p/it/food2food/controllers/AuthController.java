package pl.lodz.p.it.food2food.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.food2food.dto.PasswordHolder;
import pl.lodz.p.it.food2food.dto.requests.UserCreateDto;
import pl.lodz.p.it.food2food.dto.requests.UserLoginDto;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.services.JwtService;
import pl.lodz.p.it.food2food.services.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userReq) {
        try {
            User user = userService.getByUsername(userReq.username());
            if (passwordEncoder.matches(userReq.password(), user.getPassword())) {
                String token = jwtService.createToken(user);
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserCreateDto newUserData) {
        try {
            User newUser = new User(
                newUserData.username(),
                newUserData.email()
            );
            userService.createUser(newUser, new PasswordHolder(newUserData.password()));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
