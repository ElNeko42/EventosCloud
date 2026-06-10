package io.orquesta.eventos.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(nullable = false)
    public String passwordHash;

    public String name;
    public String role;

    public AppUser() {}

    public AppUser(String email, String passwordHash, String name, String role) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.name = name;
        this.role = role;
    }
}
