package io.orquesta.eventos.repo;

import io.orquesta.eventos.domain.ReglaAlerta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReglaAlertaRepository extends JpaRepository<ReglaAlerta, String> {
}
