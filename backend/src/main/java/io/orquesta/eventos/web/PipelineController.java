package io.orquesta.eventos.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pipeline")
public class PipelineController {

    public record Cola(String id, String nombre, String tipo, int profundidad,
                       int entrada, int salida, String latencia, String estado) {}
    public record Agente(String id, String nombre, String modelo, String tarea, String estado,
                         int procesadas, double tasaError, int throughput) {}
    public record Evento(String t, String tipo, String msg, String nivel) {}
    public record Metricas(int procesadasHoy, String latenciaMedia, String coste, String uptime,
                           List<Integer> throughput24h) {}
    public record PipelineState(List<Cola> colas, List<Agente> agentes,
                                List<Evento> eventos, Metricas metricas) {}

    @GetMapping
    public PipelineState state() {
        List<Cola> colas = List.of(
            new Cola("ingest", "raw-news-ingest", "SQS", 1240, 84, 79, "1.2s", "ok"),
            new Cola("analyze", "ai-analysis", "Pub/Sub", 312, 79, 76, "4.8s", "ok"),
            new Cola("embed", "vector-embed", "SQS", 58, 76, 75, "2.1s", "ok"),
            new Cola("alert", "critical-alerts", "SNS", 3, 4, 4, "0.4s", "ok"),
            new Cola("dead", "dead-letter", "DLQ", 17, 1, 0, "—", "warn")
        );
        List<Agente> agentes = List.of(
            new Agente("ag1", "Traductor", "gemini-1.5-flash", "Traducción ES", "activo", 4821, 0.4, 22),
            new Agente("ag2", "Resumidor", "gemini-1.5-pro", "Resumen 3-puntos", "activo", 4790, 0.9, 18),
            new Agente("ag3", "Analista Sentimiento", "gemini-1.5-flash", "Sentimiento + impacto", "activo", 4788, 0.6, 21),
            new Agente("ag4", "Etiquetador", "gemini-1.5-flash", "Clasificación sector", "activo", 4788, 1.2, 24),
            new Agente("ag5", "Vectorizador", "text-embedding-004", "Embeddings → Qdrant", "activo", 4783, 0.2, 25),
            new Agente("ag6", "Despachador Alertas", "regla + Gemini", "SES / SNS", "en espera", 312, 0.0, 2)
        );
        List<Evento> eventos = List.of(
            new Evento("14:52:09", "ingest", "84 mensajes nuevos encolados desde reuters, bloomberg, +3", "info"),
            new Evento("14:52:04", "alert", "ALERTA CRÍTICA disparada → Maersk recorta previsión (impacto 88)", "crit"),
            new Evento("14:51:58", "analyze", "Resumidor completó lote de 12 artículos en 3.4s", "info"),
            new Evento("14:51:40", "embed", "75 vectores escritos en colección qdrant:noticias", "ok"),
            new Evento("14:51:22", "dead", "1 mensaje movido a dead-letter (timeout de Gemini)", "warn"),
            new Evento("14:51:05", "ingest", "Cron EventBridge ejecutado · 8 fuentes leídas", "info"),
            new Evento("14:50:51", "analyze", "Analista Sentimiento marcó 2 noticias como sentimiento negativo fuerte", "info")
        );
        Metricas metricas = new Metricas(4788, "8.6s", "$12.40", "99.97%",
            List.of(12,18,9,14,22,31,28,19,24,33,41,38,29,35,44,52,48,39,42,55,61,49,44,38));
        return new PipelineState(colas, agentes, eventos, metricas);
    }
}
