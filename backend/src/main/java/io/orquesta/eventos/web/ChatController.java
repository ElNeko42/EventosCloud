package io.orquesta.eventos.web;

import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RAG chat endpoint. Today it returns curated demo answers so the UI is fully
 * functional offline. In production this controller would forward the question
 * to the n8n RAG workflow (embed → Qdrant search → Gemini synthesis) and stream
 * the response back. See README "Integración n8n / RAG".
 */
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    public record Cita(String id, String titulo, String fuente, double rel) {}
    public record ChatRequest(String pregunta) {}
    public record ChatResponse(String texto, List<Cita> citas) {}

    @PostMapping
    public ChatResponse ask(@RequestBody ChatRequest req) {
        String q = req.pregunta() == null ? "" : req.pregunta().toLowerCase();

        if (q.contains("logíst") || q.contains("logist")) {
            return new ChatResponse(
                "Esta semana el sector logístico ha estado dominado por dos señales opuestas:\n\n" +
                "**1. Presión sobre las navieras.** Maersk recortó su previsión de EBITDA anual a un rango de 1.000–3.000 M$ por la crisis del mar Rojo, con desvíos que añaden hasta 14 días de tránsito. Sentimiento marcadamente negativo (impacto 88, crítico).\n\n" +
                "**2. Inversión en automatización.** En el lado positivo, DHL anunció 500 M€ para automatizar sus hubs del sur de Europa, esperando reducir un 25% los tiempos de procesamiento.\n\n" +
                "En conjunto: tensión en el transporte marítimo de larga distancia, pero capital fluyendo hacia eficiencia en la última milla.",
                List.of(
                    new Cita("n3", "Maersk recorta su previsión de beneficios", "Bloomberg", 0.94),
                    new Cita("n9", "DHL invierte 500 M€ en automatización", "Google Alert", 0.88)
                ));
        }

        if (q.contains("ia") || q.contains("negativ")) {
            return new ChatResponse(
                "Hay una noticia de IA con sentimiento claramente negativo esta jornada:\n\n" +
                "**Amazon — 14.000 despidos corporativos** para reasignar recursos hacia IA generativa (impacto 81, criticidad alta). Afecta sobre todo a mandos intermedios. Es relevante como señal del patrón \"recortar plantilla para financiar IA\" que se repite en grandes tecnológicas.\n\n" +
                "Como contraste, el resto del flujo de IA de hoy es positivo (rondas de OpenAI y Anthropic, hardware de Nvidia).",
                List.of(new Cita("n7", "Amazon anuncia 14.000 despidos", "Reuters", 0.96)));
        }

        return new ChatResponse(
            "He buscado en el archivo vectorial pero no encuentro coincidencias fuertes para esa consulta en las noticias de esta semana. Prueba con un sector concreto (IA, logística, mercados) o el nombre de una empresa.",
            List.of());
    }
}
