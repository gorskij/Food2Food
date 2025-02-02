package pl.lodz.p.it.food2food.aspects;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import pl.lodz.p.it.food2food.model.AbstractEntity;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Aspect
@Component
public class TransactionAspect {
    @Pointcut("@within(transactional)")
    private void transactionalMethods(Transactional transactional) {
    }

    @Value("${transaction.timeout}")
    private int transactionTimeout;

    @Around(value = "transactionalMethods(transactional)", argNames = "jp, transactional")
    private Object logTransaction(ProceedingJoinPoint jp, Transactional transactional) throws Throwable {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String user = "<anonymous>";
        String ipAddress = "<unknown>";

        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            ipAddress = request.getHeader("X-Forwarded-For"); // Check for proxy headers
            if (ipAddress == null || ipAddress.isEmpty()) {
                ipAddress = request.getRemoteAddr();
            }
        }

        if(authentication != null) {
            try {
                UUID id = (UUID) authentication.getPrincipal();
                user = id.toString();
            } catch (Exception e) {
                user = "<anonymous>";
            }
        }
        String callerClass = jp.getTarget().getClass().getName();
        String callerMethod = jp.getSignature().getName();
        String txId = UUID.randomUUID().toString();

        if(TransactionSynchronizationManager.isActualTransactionActive()) {
            String id;
            try {
                UUID uuidId = UUID.fromString(Objects.requireNonNull(TransactionSynchronizationManager.getCurrentTransactionName()));
                id = uuidId.toString();
                log.info("Continuing existing transaction {} with propagation {} in method {}.{}", id, transactional.propagation(), callerClass, callerMethod);
            } catch (IllegalArgumentException ignored) {
                id = txId;
                TransactionSynchronizationManager.setCurrentTransactionName(id);
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronizationImpl(id));
                log.info("Transaction {} started by {} from IP {} in {}.{}", id, user, ipAddress, callerClass, callerMethod);
                int timeout = transactional.timeout() > 0 ? transactional.timeout() : transactionTimeout;
                log.info("Transaction {} info: propagation={}, isolation={}, readOnly={}, timeout={}", id, transactional.propagation(), transactional.isolation(), transactional.readOnly(), timeout);
            }
            String args = parsArgs(jp.getArgs());
            if (args != null) {
                log.info("Method {}.{} called by {} from IP {} called in transaction {} with args: {}", callerClass, callerMethod, user, ipAddress, id, args);
            } else {
                log.info("Method {}.{} called by {} from IP {} called in transaction {}", callerClass, callerMethod, user, ipAddress, id);
            }
            Object obj;
            try {
                obj = jp.proceed();
            } catch (Throwable e) {
                log.error("Method {}.{} called by {} from IP {} failed in transaction {} due {} with message {}", callerClass, callerMethod, user, ipAddress, id, e.getClass().getName(), e.getMessage());
                throw e;
            }
            String returnValue = parseReturnValue(obj);
            if (returnValue != null) {
                log.info("Method {}.{} called by {} from IP {} returned in transaction {} with: {}", callerClass, callerMethod, user, ipAddress, id, returnValue);
            } else {
                log.info("Method {}.{} called by {} from IP {} returned in transaction {}", callerClass, callerMethod, user, ipAddress, id);
            }
            return obj;
        } else {
            TransactionSynchronizationManager.setCurrentTransactionName(txId);
            String args = parsArgs(jp.getArgs());
            if (args != null) {
                log.info("Method {}.{} called by {} from IP {} with args: {}", callerClass, callerMethod, user, ipAddress, args);
            } else {
                log.info("Method {}.{} called by {} from IP {}", callerClass, callerMethod, user, ipAddress);
            }
            Object obj;
            try {
                obj = jp.proceed();
            } catch (Throwable e) {
                log.error("Method {}.{} called by {} from IP {} failed due {} with message {}", callerClass, callerMethod, user, ipAddress, e.getClass().getName(), e.getMessage());
                throw e;
            }
            String returnValue = parseReturnValue(obj);
            if (returnValue != null) {
                log.info("Method {}.{} called by {} from IP {} returned with: {}", callerClass, callerMethod, user, ipAddress, returnValue);
            } else {
                log.info("Method {}.{} called by {} from IP {} returned", callerClass, callerMethod, user, ipAddress);
            }
            return obj;
        }
    }

    private String parsArgs(Object[] args) {
        if (args == null || args.length == 0) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        for (Object arg : args) {
            if(arg == null) {
                continue;
            }
            if (arg instanceof AbstractEntity abstractEntity) {
                sb
                        .append(abstractEntity.getClass().getName())
                        .append(abstractEntity)
                        .append(", ");
            } else {
                sb.append(arg).append(", ");
            }

            if (arg instanceof List<?> entities) {
                for (Object entity : entities) {
                    if(entity == null) {
                        continue;
                    }
                    if (entity instanceof AbstractEntity abstractEntity) {
                        sb
                                .append(abstractEntity.getClass().getName())
                                .append(abstractEntity)
                                .append(", ");
                    } else {
                        sb.append(entity).append(", ");
                    }
                }
            }
        }
        if (sb.isEmpty()) {
            return null;
        }
        return sb.toString();
    }

    private String parseReturnValue(Object args) {
        if (args == null) {
            return null;
        }

        return switch (args) {
            case AbstractEntity entity -> entity.getClass().getName() + entity;
            case List<?> entities -> {
                StringBuilder sb = new StringBuilder();
                for (Object entity : entities) {
                    if (entity instanceof AbstractEntity abstractEntity) {
                        sb.append(abstractEntity).append(", ");
                    } else {
                        sb.append(entity.toString()).append(", ");
                    }
                }
                yield sb.toString();
            }
            case Object object -> object.toString();
        };
    }
}
