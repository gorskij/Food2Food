package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class ProductControllerIT extends IntegrationTestConfig {

    @Test
    @DataSet(value = "/dataset/products.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void GetAllProducts_ShouldReturnAllProducts() {
        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/products")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("content.size()", equalTo(2));
    }

    @Test
    @DataSet(value = "/dataset/products.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void GetProduct_WhenCorrectId_ShouldReturnProduct() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";

        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @DataSet(value = "/dataset/products.json", strategy = SeedStrategy.CLEAN_INSERT)
    public void GetProduct_WhenIncorrectId_ShouldReturnNotFound() {
        String productId = UUID.randomUUID().toString();

        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }
}
