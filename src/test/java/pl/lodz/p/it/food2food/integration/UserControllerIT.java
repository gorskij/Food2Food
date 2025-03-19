package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class UserControllerIT extends IntegrationTestConfig{


    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void GetAllUsers_WhenAdministrator_ShouldReturnAllUsers() {
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .get(baseUrl + "/users")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("content.size()", equalTo(2));
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void GetAllUsers_WhenUser_ShouldReturnForbidden() {
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/users")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void BlockUser_WhenAdmin_ShouldBlockUserSuccessfully() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/block")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void BlockUser_WhenUser_ShouldReturnForbidden() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/block")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void UnblockUser_WhenUser_ShouldReturnForbidden() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/unblock")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void BlockUser_WhenAlreadyBlocked_ShouldReturnConflict() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/block")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/block")
                .then()
                .assertThat()
                .statusCode(HttpStatus.CONFLICT.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void BlockUser_WhenSelfBlocking_ShouldReturnBadRequest() {
        String userId = "723e3bf0-8485-45c7-a92b-125eef6f4177";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/block")
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void UnblockUser_WhenAlreadyUnblocked_ShouldReturnConflict() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/unblock")
                .then()
                .assertThat()
                .statusCode(HttpStatus.CONFLICT.value());
    }

    @Test
    @DataSet(value = "/dataset/users.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void UnblockUser_WhenAdmin_ShouldUnblockUserSuccessfully() {
        String userId = "d8889b61-3122-4ca5-a0d6-1e4daaef94f4";

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/block")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + adminToken)
                .when()
                .post(baseUrl + "/users/" + userId + "/unblock")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }
}
