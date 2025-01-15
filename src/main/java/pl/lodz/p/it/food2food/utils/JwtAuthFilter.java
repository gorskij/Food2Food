package pl.lodz.p.it.food2food.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.lodz.p.it.food2food.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.food2food.exceptions.messages.ExceptionMessages;
import pl.lodz.p.it.food2food.services.impl.JwtService;
import pl.lodz.p.it.food2food.exceptions.handlers.ExceptionResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        logger.info("Authorization header: " + header);
        if (header != null) {
            String[] elements = header.split(" ");
            if (elements.length == 2 && "Bearer".equals(elements[0])) {
                try {
                    SecurityContextHolder.getContext().setAuthentication(jwtService.validateToken(elements[1]));
                } catch (Exception e) {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    SecurityContextHolder.clearContext();

                    ExceptionResponse exceptionResponse = new ExceptionResponse(
                            ExceptionMessages.INVALID_TOKEN,
                            ErrorCodes.JWT_TOKEN_INVALID
                    );

                    response.setContentType("application/json");

                    ObjectMapper objectMapper = new ObjectMapper();
                    String jsonResponse = objectMapper.writeValueAsString(exceptionResponse);

                    response.getWriter().write(jsonResponse);
                    return;
                }

            }
        }
            filterChain.doFilter(request, response);
    }
}