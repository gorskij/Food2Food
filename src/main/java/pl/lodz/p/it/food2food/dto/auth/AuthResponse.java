package pl.lodz.p.it.food2food.dto.auth;

import java.util.StringJoiner;

public record AuthResponse(String token, String created, String language) {
    @Override
    public String toString() {
        return new StringJoiner(", ", AuthResponse.class.getSimpleName() + "[", "]")
                .add("token='********'")
                .add("created='" + created + "'")
                .toString();
    }
}