package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class FavoriteProductControllerIT extends IntegrationTestConfig {
    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"}, cleanAfter=true)
    public void CheckFavoriteProduct_WhenUserAndCorrectProductId_ShouldReturnBooleanResponse() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("result", equalTo(false));
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"}, cleanAfter=true)
    public void CheckFavoriteProduct_WhenNoUser_ShouldReturnForbidden() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .when()
                .get(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"}, cleanAfter=true)
    public void CheckFavoriteProduct_WhenUserAndNonExistentProductId_ShouldReturnNotFound() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb1927";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"}, cleanAfter=true)
    public void AddFavoriteProduct_WhenUserAndCorrectProductId_ShouldReturnOkAdnProductInFavorites() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("result", equalTo(true));
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"}, cleanAfter=true)
    public void AddFavoriteProduct_WhenAlreadyFavorite_ShouldReturnBadRequest() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"}, cleanAfter=true)
    public void AddFavoriteProduct_WhenIncorrectProductId_ShouldReturnNotFound() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb1111";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"})
    public void RemoveFavoriteProduct_WhenUserAndCorrectProductId_ShouldReturnOkAndRemoveProductFromFavorites() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .post(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("result", equalTo(true));

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .delete(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.NO_CONTENT.value());

        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .get(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("result", equalTo(false));
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"})
    public void RemoveFavoriteProduct_WhenIncorrectProductId_ShouldReturnNotFound() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6111111";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .delete(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"})
    public void RemoveFavoriteProduct_WhenNoUser_ShouldReturnForbidden() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .when()
                .delete(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DataSet(value = {"/dataset/products.json", "/dataset/users.json"})
    public void RemoveFavoriteProduct_WhenProductNotInFavorites_ShouldReturnBadRequest() {
        String productId = "b91d5065-8d82-4a1f-9570-badfb6eb0977";
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + userToken)
                .when()
                .delete(baseUrl + "/favorite-products/" + productId)
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
