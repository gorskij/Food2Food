package pl.lodz.p.it.food2food.dto.auth;

import java.util.StringJoiner;

public record GithubOAuth2TokenPayload(
        String id,
        String username,
        String email,
        String name
) {
    @Override
    public String toString() {
        return new StringJoiner(", ", GithubOAuth2TokenPayload.class.getSimpleName() + "[", "]")
                .add("id='" + id + "'")
                .add("username='********'")
                .add("email='********'")
                .add("name='********'")
                .toString();
    }
}
