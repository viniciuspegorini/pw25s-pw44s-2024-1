package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {
    private final String API_USERS = "/users";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    // methodName_condition_expectedBehaviour
    @Test
    @DisplayName("Post a new User when the User is valid receive a 200 Ok")
    public void postUser_whenUserIsValid_receiveOk() {
        ResponseEntity<Object> response =
                testRestTemplate.postForEntity(
                        API_USERS,
                        createValidUser(),
                        Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase() {
        testRestTemplate.postForEntity(
                API_USERS,
                createValidUser(),
                Object.class);

        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {
        ResponseEntity<GenericResponse> response =
                testRestTemplate.postForEntity(
                        API_USERS,
                        createValidUser(),
                        GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    private User createValidUser() {
        return User.builder()
                .username("test-user")
                .displayName("test-Display")
                .password("P4ssword").build();
    }
}
