package io.orquesta.eventos.config.seed;

import io.orquesta.eventos.domain.Fuente;

import java.util.List;

public final class FuentesData {

    private FuentesData() {}

    public static List<Fuente> all() {
        return List.of(
            fuente("reuters", "Reuters Business", "feeds.reuters.com/business", "EN", true, 15, "hace 4 min", 142, "ok"),
            fuente("bloomberg", "Bloomberg Markets", "bloomberg.com/feed", "EN", true, 15, "hace 7 min", 98, "ok"),
            fuente("expansion", "Expansión", "expansion.com/rss/portada", "ES", true, 30, "hace 2 min", 64, "ok"),
            fuente("techcrunch", "TechCrunch", "techcrunch.com/feed", "EN", true, 20, "hace 12 min", 51, "ok"),
            fuente("elpais", "El País — Economía", "elpais.com/economia/rss", "ES", true, 30, "hace 9 min", 73, "ok"),
            fuente("theverge", "The Verge", "theverge.com/rss/index.xml", "EN", true, 25, "hace 18 min", 40, "lento"),
            fuente("galert", "Google Alert · logística", "google.com/alerts/feeds", "ES", true, 60, "hace 31 min", 12, "ok"),
            fuente("hn", "Hacker News", "news.ycombinator.com/rss", "EN", false, 20, "pausada", 0, "off")
        );
    }

    private static Fuente fuente(String id, String nombre, String url, String lang, boolean activa,
                                  int intervalo, String ultimaLectura, int articulosHoy, String salud) {
        Fuente f = new Fuente();
        f.id = id; f.nombre = nombre; f.url = url; f.lang = lang; f.activa = activa;
        f.intervalo = intervalo; f.ultimaLectura = ultimaLectura; f.articulosHoy = articulosHoy; f.salud = salud;
        return f;
    }
}
