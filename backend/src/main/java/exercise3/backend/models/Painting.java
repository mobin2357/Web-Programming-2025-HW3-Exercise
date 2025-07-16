package exercise3.backend.models;

import jakarta.persistence.*;

@Entity
public class Painting {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;

    private String username;

    @Lob
    private String jsonData;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }
    public String getJsonData() { return jsonData; }
    public void setJsonData(String jsonData) { this.jsonData = jsonData; }
}
