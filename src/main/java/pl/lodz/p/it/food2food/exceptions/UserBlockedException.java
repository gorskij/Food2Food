package pl.lodz.p.it.food2food.exceptions;

public class UserBlockedException extends ApplicationBaseException {
  public UserBlockedException(String message, String code) {
    super(message, code);
  }
}
