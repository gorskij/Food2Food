package pl.lodz.p.it.food2food.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GoogleOAuth2TokenPayload(
        String iss,
        String azp,
        String aud,
        String sub,
        String email,
        @JsonProperty("email_verified") boolean emailVerified,
        @JsonProperty("at_hash") String atHash,
        String name,
        String picture,
        @JsonProperty("given_name") String givenName,
        @JsonProperty("family_name") String familyName,
        int iat,
        int exp
) {}