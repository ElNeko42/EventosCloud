package io.orquesta.eventos.web;

import io.orquesta.eventos.domain.Noticia;
import io.orquesta.eventos.repo.NoticiaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

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

    // Ingest endpoint: el orquestador de n8n publica aquí las noticias ya procesadas.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Noticia create(@RequestBody Noticia noticia) {
        if (noticia.titulo == null || noticia.titulo.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El campo 'titulo' es obligatorio");
        }
        if (noticia.id == null || noticia.id.isBlank()) {
            noticia.id = "n-" + UUID.randomUUID();
        } else if (repo.existsById(noticia.id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una noticia con id " + noticia.id);
        }
        return repo.save(noticia);
    }
}
