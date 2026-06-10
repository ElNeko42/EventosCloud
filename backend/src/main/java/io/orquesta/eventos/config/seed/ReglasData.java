package io.orquesta.eventos.config.seed;

import io.orquesta.eventos.domain.ReglaAlerta;

import java.util.List;

public final class ReglasData {

    private ReglasData() {}

    public static List<ReglaAlerta> all() {
        return List.of(
            regla("r1", "Impacto crítico", "impacto ≥ 85", "SNS (SMS) + SES (Email)", true),
            regla("r2", "Sectores vigilados", "sector ∈ {IA, Logística, Mercados}", "SES (Email)", true),
            regla("r3", "Palabras clave", "contiene \"despidos\", \"quiebra\", \"hackeo\"", "SES (Email)", true),
            regla("r4", "Newsletter diaria", "todos · 08:00 CET", "SES (Newsletter)", false)
        );
    }

    private static ReglaAlerta regla(String id, String nombre, String cond, String accion, boolean activa) {
        ReglaAlerta r = new ReglaAlerta();
        r.id = id; r.nombre = nombre; r.cond = cond; r.accion = accion; r.activa = activa;
        return r;
    }
}
