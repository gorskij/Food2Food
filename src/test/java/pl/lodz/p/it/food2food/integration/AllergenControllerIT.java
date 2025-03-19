package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class AllergenControllerIT extends IntegrationTestConfig {
    @Test
    @DataSet(value = {"/dataset/allergens.json", "/dataset/users.json"})
    public void GetAllAllergens_WhenUser_ShouldReturnAllAllergens() {
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/allergens")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("content.size()", equalTo(2));
    }

    @Test
    @DataSet(value = "/dataset/allergens.json")
    public void GetAllAllergens_WhenNoUser_ShouldReturnForbidden() {
        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/allergens")
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }
}
