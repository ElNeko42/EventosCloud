package io.orquesta.eventos.web;

import io.orquesta.eventos.domain.Fuente;
import io.orquesta.eventos.repo.FuenteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/fuentes")
public class FuenteController {

    private final FuenteRepository repo;

    public FuenteController(FuenteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Fuente> list() {
        return repo.findAll();
    }

    public record NuevaFuente(String url) {}

    @PostMapping
    public Fuente create(@RequestBody NuevaFuente body) {
        String clean = body.url().replaceFirst("^https?://", "");
        Fuente f = new Fuente();
        f.id = "x" + System.currentTimeMillis();
        f.nombre = clean.split("/")[0];
        f.url = clean;
        f.lang = "EN";
        f.activa = true;
        f.intervalo = 30;
        f.ultimaLectura = "pendiente";
        f.articulosHoy = 0;
        f.salud = "ok";
        return repo.save(f);
    }

    @PatchMapping("/{id}/toggle")
    public Fuente toggle(@PathVariable String id) {
        Fuente f = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fuente no encontrada"));
        f.activa = !f.activa;
        f.salud = f.activa ? "ok" : "off";
        f.ultimaLectura = f.activa ? "ahora" : "pausada";
        return repo.save(f);
    }
}
