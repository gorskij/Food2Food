package pl.lodz.p.it.food2food.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@Component
@AllArgsConstructor
public class JwtService {
    private final String secret_key = "very_secret_key_123!";
    private final UserRepository userRepository;

    public String createToken(User user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime validity = now.plusHours(12);

        return JWT.create()
                .withSubject(user.getUsername())
//                .withClaim("user_role", user.getRole())
                .withClaim("id", user.getId().toString())
                .withIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .withExpiresAt(Date.from(validity.atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC256(secret_key));
    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret_key)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        Optional<User> user = userRepository.getByUsername(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(user, null, Collections.singleton(new SimpleGrantedAuthority("USER")));
    }

    public String getUserLogin(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret_key)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();
    }
}