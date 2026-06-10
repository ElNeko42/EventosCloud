package io.orquesta.eventos.config.seed;

import io.orquesta.eventos.domain.Alerta;

import java.util.List;

public final class AlertasData {

    private AlertasData() {}

    public static List<Alerta> all() {
        return List.of(
            alerta("a1", "Maersk recorta su previsión de beneficios por la crisis del mar Rojo", "n3", 88, "logistica",
                List.of("SNS · SMS", "SES · Email"), 6, "hace 4 min", "enviada",
                "Impacto > 85 + sentimiento negativo en sector vigilado (Logística)"),
            alerta("a2", "OpenAI cierra ronda récord de 6.500 M$", "n1", 91, "ia",
                List.of("SES · Newsletter"), 240, "hace 8 min", "enviada",
                "Impacto > 90 en sector vigilado (IA)"),
            alerta("a3", "Amazon anuncia 14.000 despidos para financiar IA", "n7", 81, "ia",
                List.of("SES · Email"), 6, "hace 2 h", "enviada",
                "Palabra clave vigilada: \"despidos\" + impacto > 80"),
            alerta("a4", "Bruselas multa con 1.800 M€ por prácticas anticompetitivas", "n5", 70, "politica",
                List.of("SES · Email"), 6, "hace 1 h", "descartada",
                "Impacto 70 < umbral 80 · registrada sin envío")
        );
    }

    private static Alerta alerta(String id, String noticia, String noticiaId, int impacto, String sector,
                                  List<String> canal, int destinatarios, String hora, String estado, String motivo) {
        Alerta a = new Alerta();
        a.id = id; a.noticia = noticia; a.noticiaId = noticiaId; a.impacto = impacto; a.sector = sector;
        a.canal = canal; a.destinatarios = destinatarios; a.hora = hora; a.estado = estado; a.motivo = motivo;
        return a;
    }
}
