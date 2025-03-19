package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.UUID;

import static io.restassured.RestAssured.given;

public class AdministratorControllerIT extends IntegrationTestConfig {
    @Test
    @DataSet(value = "/dataset/users.json")
    public void AddAdministratorRole_WhenUserExists_ShouldReturnOk() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .put(baseUrl + "/admins/" + userId + "/add-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json")
    public void AddAdministratorRole_WhenUserNotFound_ShouldReturnNotFound() {
        String nonExistentUserId = UUID.randomUUID().toString();

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .put(baseUrl + "/admins/" + nonExistentUserId + "/add-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json")
    public void RemoveAdministratorRole_WhenUserExists_ShouldReturnOk() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .put(baseUrl + "/admins/" + userId + "/add-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .put(baseUrl + "/admins/" + userId + "/remove-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json")
    public void RemoveAdministratorRole_WhenUserNotFound_ShouldReturnNotFound() {
        String nonExistentUserId = UUID.randomUUID().toString();

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .put(baseUrl + "/admins/" + nonExistentUserId + "/remove-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json")
    public void RemoveAdministratorRole_WhenUser_ShouldReturnForbidden() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .put(baseUrl + "/admins/" + userId + "/remove-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json")
    public void AddAdministratorRole_WhenUser_ShouldReturnForbidden() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .put(baseUrl + "/admins/" + userId + "/add-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json")
    public void RemoveAdministratorRole_WhenSelfRemoving_ShouldReturnBadRequest() {
        String userId = "723e3bf0-8485-45c7-a92b-125eef6f4177";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .put(baseUrl + "/admins/" + userId + "/remove-role")
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
