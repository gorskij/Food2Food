package pl.lodz.p.it.food2food.integration;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;

public class FallbackControllerIT extends IntegrationTestConfig {
    @Test
    public void Fallback_WhenNotExistingEndpoint_ShouldReturnNotFound() {
        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/not-existing-endpoint")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }
}
