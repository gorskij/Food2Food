package pl.lodz.p.it.food2food.exceptions;

public class NotFoundException extends ApplicationBaseException {
    public NotFoundException(String message, String code) {
        super(message, code);
    }
}
