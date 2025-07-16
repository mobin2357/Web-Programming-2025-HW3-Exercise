package exercise3.backend.configs;

import org.springframework.stereotype.Component;

import exercise3.backend.repository.UserRepository;
import exercise3.backend.models.User;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

@Component
public class DataBaseInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        if(userRepository.count() == 0) {
            List<User> users = Arrays.asList(
                new User("mobin", "psw"),
                new User("mobin1", "psw1"),
                new User("mobin2", "psw2"),
                new User("mobin3", "psw3"),
                new User("mobin4", "psw4"),
                new User("mobin5", "psw5"),
                new User("mobin6", "psw6")
            );

            userRepository.saveAll(users);
            System.out.println("dummy users added to database");
        } else {
            System.out.println("skipping initialization");
        }
    }
}
