package br.edu.utfpr.pb.pw25s.server.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {
        Map<String, String> validationErrors = new HashMap<>();
        for(FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ApiError.builder()
                .status(400)
                .message("Validation error")
                .url(request.getServletPath())
                .validationErrors(validationErrors)
                .build();
    }
}
