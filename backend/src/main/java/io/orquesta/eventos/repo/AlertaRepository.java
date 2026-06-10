package io.orquesta.eventos.repo;

import io.orquesta.eventos.domain.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertaRepository extends JpaRepository<Alerta, String> {
}
