package pl.lodz.p.it.food2food.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.StringJoiner;

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
) {
    @Override
    public String toString() {
        return new StringJoiner(", ", GoogleOAuth2TokenPayload.class.getSimpleName() + "[", "]")
                .add("iss='" + iss + "'")
                .add("azp='" + azp + "'")
                .add("aud='" + aud + "'")
                .add("sub='********'")
                .add("email='********'")
                .add("emailVerified=" + emailVerified)
                .add("atHash='********'")
                .add("name='********'")
                .add("picture='********'")
                .add("givenName='********'")
                .add("familyName='********'")
                .add("iat=" + iat)
                .add("exp=" + exp)
                .toString();
    }
}