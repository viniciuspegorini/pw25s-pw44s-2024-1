package br.edu.utfpr.pb.pw25s.server.validation;

import br.edu.utfpr.pb.pw25s.server.annotation.UniqueUsername;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (userRepository.findByUsername(s) == null) {
            return true;
        }
        return false;
    }
}
