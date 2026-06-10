package io.orquesta.eventos.web;

import io.orquesta.eventos.domain.AppUser;
import io.orquesta.eventos.repo.AppUserRepository;
import io.orquesta.eventos.security.JwtService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AppUserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(AppUserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record UserDto(String email, String name, String role) {}
    public record LoginResponse(String token, long expiresInMs, UserDto user) {}

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        AppUser user = users.findByEmail(req.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));
        if (!encoder.matches(req.password(), user.passwordHash)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }
        String token = jwt.generate(user.email, user.name, user.role);
        return new LoginResponse(token, jwt.getExpirationMs(), new UserDto(user.email, user.name, user.role));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            var claims = jwt.parse(auth.substring(7));
            return ResponseEntity.ok(new UserDto(
                    claims.getSubject(),
                    claims.get("name", String.class),
                    claims.get("role", String.class)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
