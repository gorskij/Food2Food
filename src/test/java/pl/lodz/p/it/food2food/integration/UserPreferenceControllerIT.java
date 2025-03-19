package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import pl.lodz.p.it.food2food.dto.requests.UserPreferenceRequest;
import pl.lodz.p.it.food2food.dto.responses.UserPreferenceResponse;

import java.util.Set;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class UserPreferenceControllerIT extends IntegrationTestConfig {
    @Test
    @DataSet(value = {"/dataset/users.json", "/dataset/packageTypes.json", "/dataset/userPreferences.json"}, strategy = SeedStrategy.CLEAN_INSERT)
    public void GetUserPreference_WhenUser_ShouldReturnUserPreference() {
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("positivePackageTypes.size()", equalTo(1))
                .body("negativePackageTypes.size()", equalTo(1))
                .body("negativeRatings.size()", equalTo(0));
    }

    @Test
    public void GetUserPreference_WhenNoUser_ShouldReturnUserForbidden() {
        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = {"/dataset/users.json", "/dataset/packageTypes.json", "/dataset/userPreferences.json"}, strategy = SeedStrategy.CLEAN_INSERT)
    public void EditUserPreference_WhenNoUser_ShouldReturnUserForbidden() {
        UserPreferenceRequest userPreference = new UserPreferenceRequest(
                Set.of(),  // allergens
                Set.of(),  // positiveRatings
                Set.of(),  // negativeRatings
                Set.of(),  // positiveNutritionalValueNames
                Set.of(),  // negativeNutritionalValueNames
                Set.of(),  // positivePackageTypes
                Set.of()   // negativePackageTypes
        );

        String etag = given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .extract().header("ETag");

        given()
                .contentType("application/json")
                .body(userPreference)
                .header("If-Match", etag.substring(1, etag.length()-1))
                .when()
                .put(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = {"/dataset/users.json", "/dataset/packageTypes.json", "/dataset/userPreferences.json"}, strategy = SeedStrategy.CLEAN_INSERT)
    public void EditUserPreference_WhenUserAndCorrectData_ShouldEditPreferences() {
        UserPreferenceRequest newUserPreference = new UserPreferenceRequest(
                Set.of(),  // allergens
                Set.of(),  // positiveRatings
                Set.of(),  // negativeRatings
                Set.of(),  // positiveNutritionalValueNames
                Set.of(),  // negativeNutritionalValueNames
                Set.of(),  // positivePackageTypes
                Set.of()   // negativePackageTypes
        );

        String etag = given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("positivePackageTypes.size()", equalTo(1))
                .body("negativePackageTypes.size()", equalTo(1))
                .extract().header("ETag");

        given()
                .contentType("application/json")
                .body(newUserPreference)
                .header("If-Match", etag.substring(1, etag.length()-1))
                .header("Authorization", "Bearer " + userToken)
                .when()
                .put(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("positivePackageTypes.size()", equalTo(0))
                .body("negativePackageTypes.size()", equalTo(0));
    }

    @Test
    @DataSet(value = {"/dataset/users.json", "/dataset/packageTypes.json", "/dataset/userPreferences.json"}, strategy = SeedStrategy.CLEAN_INSERT)
    public void EditUserPreference_WhenUserAndDataModified_ShouldReturnPreconditionFailed() {
        UserPreferenceRequest newUserPreference = new UserPreferenceRequest(
                Set.of(),  // allergens
                Set.of(),  // positiveRatings
                Set.of(),  // negativeRatings
                Set.of(),  // positiveNutritionalValueNames
                Set.of(),  // negativeNutritionalValueNames
                Set.of(),  // positivePackageTypes
                Set.of()   // negativePackageTypes
        );

        String etag = given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("positivePackageTypes.size()", equalTo(1))
                .body("negativePackageTypes.size()", equalTo(1))
                .extract().header("ETag");

        given()
                .contentType("application/json")
                .body(newUserPreference)
                .header("If-Match", etag.substring(1, etag.length()-1))
                .header("Authorization", "Bearer " + userToken)
                .when()
                .put(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("positivePackageTypes.size()", equalTo(0))
                .body("negativePackageTypes.size()", equalTo(0));

        given()
                .contentType("application/json")
                .body(newUserPreference)
                .header("If-Match", etag.substring(1, etag.length()-1))
                .header("Authorization", "Bearer " + userToken)
                .when()
                .put(baseUrl + "/user-preference")
                .then()
                .assertThat()
                .statusCode(HttpStatus.PRECONDITION_FAILED.value());
    }
}