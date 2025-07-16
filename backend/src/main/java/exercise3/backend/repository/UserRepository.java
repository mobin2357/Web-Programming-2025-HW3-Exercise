package exercise3.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import exercise3.backend.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
