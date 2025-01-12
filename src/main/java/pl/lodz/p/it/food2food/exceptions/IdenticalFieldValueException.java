package pl.lodz.p.it.food2food.exceptions;

public class IdenticalFieldValueException extends ApplicationBaseException {

  public IdenticalFieldValueException(String message, String code) {super(message, code);}
  public IdenticalFieldValueException(String message, Throwable cause, String code) {
    super(message, cause, code);
  }
}