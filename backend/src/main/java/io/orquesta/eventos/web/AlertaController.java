package io.orquesta.eventos.web;

import io.orquesta.eventos.domain.Alerta;
import io.orquesta.eventos.domain.ReglaAlerta;
import io.orquesta.eventos.repo.AlertaRepository;
import io.orquesta.eventos.repo.ReglaAlertaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/alertas")
public class AlertaController {

    private final AlertaRepository alertas;
    private final ReglaAlertaRepository reglas;

    public AlertaController(AlertaRepository alertas, ReglaAlertaRepository reglas) {
        this.alertas = alertas;
        this.reglas = reglas;
    }

    @GetMapping
    public List<Alerta> list() {
        return alertas.findAll();
    }

    @GetMapping("/reglas")
    public List<ReglaAlerta> reglas() {
        return reglas.findAll();
    }

    @PatchMapping("/reglas/{id}/toggle")
    public ReglaAlerta toggle(@PathVariable String id) {
        ReglaAlerta r = reglas.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Regla no encontrada"));
        r.activa = !r.activa;
        return reglas.save(r);
    }
}
