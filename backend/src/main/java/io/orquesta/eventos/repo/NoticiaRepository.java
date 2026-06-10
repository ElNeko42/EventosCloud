package io.orquesta.eventos.repo;

import io.orquesta.eventos.domain.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticiaRepository extends JpaRepository<Noticia, String> {
}
