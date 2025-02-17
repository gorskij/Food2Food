package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import pl.lodz.p.it.food2food.dto.responses.RoleResponse;
import pl.lodz.p.it.food2food.dto.responses.UserResponse;
import pl.lodz.p.it.food2food.model.AccessLevel;
import pl.lodz.p.it.food2food.model.User;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "accessLevels", target = "roles", qualifiedByName = "mapAccessLevelsToRoles")
    UserResponse toUserResponse(User user);

    @Named("mapAccessLevelsToRoles")
    static List<RoleResponse> mapAccessLevelsToRoles(List<AccessLevel> accessLevels) {
        return accessLevels.stream()
                .map(accessLevel -> new RoleResponse(accessLevel.getLevel().toUpperCase(), accessLevel.isActive()))
                .collect(Collectors.toList());
    }
}
