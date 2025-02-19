package pl.lodz.p.it.food2food.exceptions.handlers;

public class ErrorCodes {



    private ErrorCodes() {
    }

    public static final String USER_BLOCKED = "userBlocked";
    public static final String USER_ALREADY_UNBLOCKED = "userAlreadyUnblocked";
    public static final String USER_ALREADY_BLOCKED = "userAlreadyBlocked";
    public static final String ADMINISTRATOR_OWN_BLOCK = "administratorOwnBlock";
    public static final String OPTIMISTIC_LOCK = "optimisticLock";
    public static final String REGISTRATION_ERROR = "registrationError";
    public static final String INVALID_DATA = "invalidData";
    public static final String INTERNAL_SERVER_ERROR = "internalServerError";
    public static final String ADMINISTRATOR_OWN_ROLE_REMOVAL = "administratorOwnRoleRemoval";
    public static final String NOT_FOUND = "notFound";
    public static final String USER_NOT_FOUND = "userNotFound";
    public static final String PRODUCT_NOT_FOUND = "productNotFound";
    public static final String IDENTICAL_EMAIL = "identicalEmail";
    public static final String PRODUCT_ALREADY_IN_FAVORITES = "productAlreadyInFavorites";
    public static final String PRODUCT_NOT_IN_FAVORITES = "productNotInFavorites";
    public static final String SOMETHING_WENT_WRONG = "somethingWentWrong";
    public static final String ACCESS_DENIED = "accessDenied";
    public static final String JWT_TOKEN_INVALID = "jwtTokenInvalid";
    public static final String VALIDATION_ERROR = "validationError";
    public static final String ROLLBACK = "rollback";
    public static final String UNEXPECTED_ROLLBACK = "unexpectedRollback";
    public static final String TRANSACTION = "transaction";
    public static final String ACCESS_LEVEL_ASSIGNED = "accessLevelAssigned";
    public static final String ACCESS_LEVEL_TAKEN = "accessLevelTaken";
    public static final String USER_ALREADY_HAS_ROLE = "userAlreadyHasRole";
}