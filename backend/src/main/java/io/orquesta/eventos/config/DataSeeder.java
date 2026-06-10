package io.orquesta.eventos.config;

import io.orquesta.eventos.config.seed.AlertasData;
import io.orquesta.eventos.config.seed.FuentesData;
import io.orquesta.eventos.config.seed.NoticiasData;
import io.orquesta.eventos.config.seed.ReglasData;
import io.orquesta.eventos.domain.AppUser;
import io.orquesta.eventos.repo.AlertaRepository;
import io.orquesta.eventos.repo.AppUserRepository;
import io.orquesta.eventos.repo.FuenteRepository;
import io.orquesta.eventos.repo.NoticiaRepository;
import io.orquesta.eventos.repo.ReglaAlertaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(NoticiaRepository noticias, FuenteRepository fuentes,
                           AlertaRepository alertas, ReglaAlertaRepository reglas,
                           AppUserRepository usuarios, PasswordEncoder encoder,
                           AppProperties props) {
        return args -> {
            seedDemoUser(usuarios, encoder, props.getDemoUser());
            fuentes.saveAll(FuentesData.all());
            noticias.saveAll(NoticiasData.all());
            alertas.saveAll(AlertasData.all());
            reglas.saveAll(ReglasData.all());
        };
    }

    private void seedDemoUser(AppUserRepository usuarios, PasswordEncoder encoder, AppProperties.DemoUser demo) {
        if (usuarios.count() > 0) return;
        usuarios.save(new AppUser(demo.getEmail(), encoder.encode(demo.getPassword()), demo.getName(), demo.getRole()));
    }
}
