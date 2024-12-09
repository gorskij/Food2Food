package pl.lodz.p.it.food2food.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GithubOAuth2TokenResponse(
        @JsonProperty("access_token") String accessToken,
        @JsonProperty("scope") String scope,
        @JsonProperty("token_type") String tokenType
) {

}
