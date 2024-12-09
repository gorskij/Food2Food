package pl.lodz.p.it.food2food.dto;

public record GithubOAuth2TokenPayload(
        String id,
        String username,
        String email,
        String avatarUrl,
        String name
) {}
