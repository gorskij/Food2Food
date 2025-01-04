package pl.lodz.p.it.food2food.exceptions;

public class ProductAlreadyInFavorites extends ApplicationBaseException {
    public ProductAlreadyInFavorites(String message, String code) {
        super(message, code);
    }
}
