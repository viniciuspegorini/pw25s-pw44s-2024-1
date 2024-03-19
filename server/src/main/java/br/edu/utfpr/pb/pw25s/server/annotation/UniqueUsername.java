package br.edu.utfpr.pb.pw25s.server.annotation;

import br.edu.utfpr.pb.pw25s.server.validation.UniqueUsernameValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {

    String message() default "{br.edu.pb.utfpr.pw25s.server.user.username.Unique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
