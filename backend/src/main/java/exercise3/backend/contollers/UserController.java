package exercise3.backend.contollers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import exercise3.backend.repository.UserRepository;
import exercise3.backend.models.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody User user) {
        Optional<User> found = userRepository.findByUsername(user.getUsername());
        if(found.isPresent() && found.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(found.get());
        }
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("wrong username or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("wrong username or password"));
    }
}
