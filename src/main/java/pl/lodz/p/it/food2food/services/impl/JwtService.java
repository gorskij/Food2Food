package pl.lodz.p.it.food2food.services.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.exceptions.NotFoundException;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.UserExceptionMessages;
import pl.lodz.p.it.food2food.model.User;
import pl.lodz.p.it.food2food.repositories.UserRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(propagation = Propagation.MANDATORY)
@RequiredArgsConstructor
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    private final UserRepository userRepository;

    @PreAuthorize("permitAll()")
    public String createToken(User user, List<String> roles) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime validity = now.plusHours(2);

        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("id", user.getId().toString())
                .withClaim("username", user.getUsername())
                .withClaim("authorities", roles)
                .withIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .withExpiresAt(Date.from(validity.atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC256(secretKey));
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Authentication validateToken(String token) throws NotFoundException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        User user = userRepository.findByUsername(decodedJWT.getSubject()).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        List<GrantedAuthority> authorities = user.getAccessLevels().stream()
                .map(accessLevel -> new SimpleGrantedAuthority("ROLE_" + accessLevel.getLevel().toUpperCase()))
                .collect(Collectors.toList());
        return new UsernamePasswordAuthenticationToken(user.getId(), null, authorities);
    }

    public String getUserId(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("id").asString();
    }
}