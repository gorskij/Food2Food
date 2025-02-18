package pl.lodz.p.it.food2food.exceptions;

public class UserAlreadyUnblockedException extends ApplicationBaseException {

    public UserAlreadyUnblockedException(String message, String code) {
        super(message, code);
    }
}
