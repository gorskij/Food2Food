package pl.lodz.p.it.food2food.dto.responses;

import java.util.List;
import java.util.UUID;

public record UserResponse(UUID id, String username, String email, List<RoleResponse> roles, boolean blocked) {
}
