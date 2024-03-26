package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.error.ApiError;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return GenericResponse.builder().message("User saved.").build();
    }

}
