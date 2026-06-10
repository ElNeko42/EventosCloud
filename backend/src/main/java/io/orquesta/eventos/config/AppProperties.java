package io.orquesta.eventos.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final Jwt jwt = new Jwt();
    private final Cors cors = new Cors();
    private final DemoUser demoUser = new DemoUser();

    public Jwt getJwt() { return jwt; }
    public Cors getCors() { return cors; }
    public DemoUser getDemoUser() { return demoUser; }

    public static class Jwt {
        private String secret;
        private long expirationMinutes = 720;
        public String getSecret() { return secret; }
        public void setSecret(String secret) { this.secret = secret; }
        public long getExpirationMinutes() { return expirationMinutes; }
        public void setExpirationMinutes(long v) { this.expirationMinutes = v; }
    }

    public static class Cors {
        private String allowedOrigins = "http://localhost:5173";
        public String getAllowedOrigins() { return allowedOrigins; }
        public void setAllowedOrigins(String v) { this.allowedOrigins = v; }
    }

    public static class DemoUser {
        private String email;
        private String password;
        private String name;
        private String role;
        public String getEmail() { return email; }
        public void setEmail(String v) { this.email = v; }
        public String getPassword() { return password; }
        public void setPassword(String v) { this.password = v; }
        public String getName() { return name; }
        public void setName(String v) { this.name = v; }
        public String getRole() { return role; }
        public void setRole(String v) { this.role = v; }
    }
}
