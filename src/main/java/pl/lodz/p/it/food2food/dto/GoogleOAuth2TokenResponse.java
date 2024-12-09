package pl.lodz.p.it.food2food.dto;

public record GoogleOAuth2TokenResponse(
        String access_token,
        Integer expires_in,
        String token_type,
        String id_token,
        String scope,
        String refresh_token
) { }