package io.orquesta.eventos.repo;

import io.orquesta.eventos.domain.Fuente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuenteRepository extends JpaRepository<Fuente, String> {
}
