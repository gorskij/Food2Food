package pl.lodz.p.it.food2food.services.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;

@Service
@AllArgsConstructor
public class JwtService {
    private final String secret_key = "very_secret_key_123!";
    private final UserRepository userRepository;

    public String createToken(User user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime validity = now.plusHours(1);

        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("id", user.getId().toString())
                .withClaim("username", user.getUsername())
                .withIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .withExpiresAt(Date.from(validity.atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC256(secret_key));
    }

    public Authentication validateToken(String token) throws NotFoundException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret_key)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        User user = userRepository.findByUsername(decodedJWT.getSubject()).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        return new UsernamePasswordAuthenticationToken(user.getId(), null, Collections.emptyList());
    }

    public String getUserId(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret_key)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("id").asString();
    }
}