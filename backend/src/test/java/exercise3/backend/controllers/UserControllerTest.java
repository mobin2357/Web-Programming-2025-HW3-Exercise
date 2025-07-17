// package exercise3.backend.controllers;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import exercise3.backend.models.User;
// import exercise3.backend.repository.UserRepository;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import java.util.Optional;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(UserController.class)
// public class UserControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private UserRepository userRepository;

//     private final ObjectMapper objectMapper = new ObjectMapper();

//     @Test
//     public void testLoginSuccess() throws Exception {
//         User user = new User("testuser", "password123");
//         Mockito.when(userRepository.findByUsername("testuser"))
//                .thenReturn(Optional.of(user));

//         mockMvc.perform(post("/api/users/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(user)))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string("Logged in successfully"));
//     }

//     @Test
//     public void testLoginFailure() throws Exception {
//         User user = new User("testuser", "wrongpassword");
//         Mockito.when(userRepository.findByUsername("testuser"))
//                .thenReturn(Optional.of(new User("testuser", "correctpassword")));

//         mockMvc.perform(post("/api/users/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(user)))
//                 .andExpect(status().isUnauthorized())
//                 .andExpect(content().string("wrong username or password"));
//     }
// }
	
