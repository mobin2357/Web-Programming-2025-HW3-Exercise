package exercise3.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import exercise3.backend.models.Painting;

import java.util.Optional;

public interface PaintingRepository extends JpaRepository<Painting, Long> {
    Optional<Painting> findByUsername(String username);
}
