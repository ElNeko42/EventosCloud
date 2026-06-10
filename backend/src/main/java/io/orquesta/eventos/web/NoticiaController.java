package io.orquesta.eventos.web;

import io.orquesta.eventos.domain.Noticia;
import io.orquesta.eventos.repo.NoticiaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaRepository repo;

    public NoticiaController(NoticiaRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Noticia> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Noticia get(@PathVariable String id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Noticia no encontrada"));
    }
}
