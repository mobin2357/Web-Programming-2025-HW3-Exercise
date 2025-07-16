package exercise3.backend.contollers;

import exercise3.backend.repository.PaintingRepository;
import exercise3.backend.repository.UserRepository;
import exercise3.backend.models.Painting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/paintings")
public class PaintingController {
    private PaintingRepository paintingRepository;

    public PaintingController(PaintingRepository paintingRepository) {
        this.paintingRepository = paintingRepository;
    }

    @PostMapping("/save")
    public ResponseEntity<String> savePainting(@RequestBody Painting painting){
        Optional<Painting> existing = paintingRepository.findByUsername(painting.getUsername());
        if (existing.isPresent()) {
            Painting existingPainting = existing.get();
            existingPainting.setJsonData(painting.getJsonData());
            paintingRepository.save(existingPainting);
            return ResponseEntity.ok("Painting updated");
        } else {
            paintingRepository.save(painting);
            return ResponseEntity.ok("Painting saved");
        }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getPainting(@PathVariable String username) {
        Optional<Painting> painting = paintingRepository.findByUsername(username);
        if (painting.isPresent()) {
            return ResponseEntity.ok(painting.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
