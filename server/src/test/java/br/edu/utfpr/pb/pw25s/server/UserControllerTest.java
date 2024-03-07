package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {


    // methodName_condition_expectedBehaviour
    @Test
    @DisplayName("Post a new User when the User is valid receive a 200 Ok")
    public void postUser_whenUserIsValid_receiveOk() {
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-Display");
        user.setPassword("P4ssword");

    }


}
