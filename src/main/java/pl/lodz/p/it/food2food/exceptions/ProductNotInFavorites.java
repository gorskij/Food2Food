package pl.lodz.p.it.food2food.exceptions;

public class ProductNotInFavorites extends ApplicationBaseException {
    public ProductNotInFavorites(String message, String code) {
        super(message, code);
    }
}
