package pl.lodz.p.it.food2food.exceptions;

public class UserAlreadyBlockedException extends ApplicationBaseException {

    public UserAlreadyBlockedException(String message, String code) {
        super(message, code);
    }
}
