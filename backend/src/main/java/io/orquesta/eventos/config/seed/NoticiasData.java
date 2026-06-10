package io.orquesta.eventos.config.seed;

import io.orquesta.eventos.domain.Noticia;

import java.util.List;

public final class NoticiasData {

    private NoticiasData() {}

    public static List<Noticia> all() {
        return List.of(
            noticia("n1", "OpenAI cierra una ronda récord de 6.500 M$ y dispara su valoración a 157.000 M$",
                "Reuters Business", "reuters", "EN", true, "hace 8 min", 4, List.of("ia", "startups"),
                "positivo", 0.82, "alta", 91,
                List.of(
                    "La ronda, liderada por Thrive Capital con participación de Microsoft y Nvidia, sitúa a OpenAI entre las startups privadas más valiosas del mundo.",
                    "Los fondos se destinarán a infraestructura de cómputo y a acelerar el desarrollo del próximo modelo de razonamiento.",
                    "Condición clave: la inversión está atada a la reestructuración de OpenAI como empresa con ánimo de lucro en un plazo de dos años."),
                List.of("OpenAI", "Thrive Capital", "Microsoft", "Nvidia"),
                "OpenAI ha completado una de las mayores rondas de financiación de la historia del capital riesgo. La operación, de 6.500 millones de dólares, fue liderada por Thrive Capital e incluye a inversores estratégicos como Microsoft, Nvidia y SoftBank. La nueva valoración de 157.000 millones de dólares casi duplica la cifra alcanzada a comienzos de año.\n\nSegún fuentes cercanas a la operación, el capital se destinará principalmente a financiar la creciente factura de cómputo de la compañía y a contratar talento de investigación. La empresa habría comunicado a sus inversores que la financiación está condicionada a completar su transición desde una estructura controlada por una entidad sin ánimo de lucro hacia una corporación de beneficio público convencional.\n\nAnalistas advierten de que la presión por monetizar podría tensar la misión fundacional de la organización, en un momento de intensa competencia con Anthropic, Google DeepMind y los modelos abiertos de Meta."),

            noticia("n2", "El BCE mantiene los tipos pero abre la puerta a un recorte en septiembre",
                "Expansión", "expansion", "ES", false, "hace 23 min", 3, List.of("mercados", "politica"),
                "neutral", 0.12, "alta", 78,
                List.of(
                    "El Consejo de Gobierno deja el tipo de depósito en el 3,75% por unanimidad, en línea con lo esperado por el mercado.",
                    "Lagarde evita comprometerse con una senda concreta y reitera que las decisiones se tomarán \"reunión a reunión\".",
                    "El euro reaccionó con una ligera apreciación frente al dólar; las bolsas europeas cerraron planas."),
                List.of("BCE", "Christine Lagarde", "Euro"),
                "El Banco Central Europeo ha optado por la cautela en su reunión de hoy, manteniendo sin cambios los tipos de interés de referencia. La decisión era ampliamente anticipada por los analistas tras los últimos datos de inflación subyacente, que se mantienen por encima del objetivo del 2%.\n\nEn rueda de prensa, la presidenta Christine Lagarde insistió en que la institución no se compromete de antemano con ninguna trayectoria concreta de tipos y que actuará en función de los datos. No obstante, varios miembros del Consejo dejaron entrever que un recorte en septiembre es plausible si la desinflación continúa."),

            noticia("n3", "Maersk recorta su previsión de beneficios por la crisis del mar Rojo y el desplome de fletes",
                "Bloomberg Markets", "bloomberg", "EN", true, "hace 41 min", 5, List.of("logistica", "mercados"),
                "negativo", -0.71, "critica", 88,
                List.of(
                    "La naviera danesa rebaja su previsión de EBITDA anual hasta un rango de 1.000–3.000 M$, citando la prolongada disrupción en el canal de Suez.",
                    "Los desvíos por el cabo de Buena Esperanza añaden hasta 14 días de tránsito y disparan los costes de combustible.",
                    "Maersk advierte de que la sobrecapacidad de nuevos buques presionará a la baja los fletes en 2025."),
                List.of("Maersk", "Canal de Suez", "Mar Rojo"),
                "A.P. Moller-Maersk, uno de los mayores operadores de transporte marítimo de contenedores del mundo, ha revisado a la baja sus previsiones financieras. La compañía atribuye el ajuste a la persistente crisis de seguridad en el mar Rojo, que obliga a la mayoría de las navieras a desviar sus rutas alrededor del sur de África.\n\nEstos desvíos incrementan tanto el tiempo de tránsito como el consumo de combustible, erosionando los márgenes pese a la subida puntual de los fletes spot. La dirección advirtió además de un riesgo estructural: la entrada masiva de nueva capacidad de buques encargados durante la pandemia podría saturar el mercado el próximo año."),

            noticia("n4", "Nvidia presenta Blackwell Ultra y promete duplicar el rendimiento en inferencia",
                "The Verge", "theverge", "EN", true, "hace 1 h", 4, List.of("ia", "mercados"),
                "positivo", 0.69, "normal", 74,
                List.of(
                    "La nueva generación de GPUs apunta a cargas de inferencia de modelos de razonamiento, con mejoras de eficiencia energética del 40%.",
                    "Las grandes nubes (AWS, Azure, Google Cloud) ya han reservado capacidad para el primer trimestre de disponibilidad.",
                    "La acción de Nvidia subió un 3,1% en operaciones posteriores al cierre."),
                List.of("Nvidia", "Blackwell", "AWS", "Azure"),
                "Nvidia ha levantado el velo sobre Blackwell Ultra, la evolución de su arquitectura de centro de datos orientada específicamente a las cargas de inferencia de los nuevos modelos de razonamiento. La compañía afirma que el chip duplica el rendimiento por vatio respecto a la generación anterior."),

            noticia("n5", "Bruselas multa a una gran tecnológica con 1.800 M€ por prácticas anticompetitivas",
                "El País — Economía", "elpais", "ES", false, "hace 1 h", 4, List.of("politica", "ia"),
                "negativo", -0.48, "alta", 70,
                List.of(
                    "La Comisión Europea concluye que la compañía abusó de su posición dominante en el mercado de la publicidad digital.",
                    "Es la tercera sanción de gran cuantía impuesta por Bruselas a la firma en la última década.",
                    "La empresa ha anunciado que recurrirá la decisión ante el Tribunal General de la UE."),
                List.of("Comisión Europea", "Bruselas"),
                "La Comisión Europea ha impuesto una multa de 1.800 millones de euros tras concluir una investigación de varios años sobre prácticas anticompetitivas en el mercado publicitario. El regulador sostiene que la compañía favoreció sistemáticamente sus propios servicios en detrimento de los competidores."),

            noticia("n6", "Una startup española de baterías de estado sólido capta 80 M€ en serie B",
                "TechCrunch", "techcrunch", "EN", true, "hace 2 h", 3, List.of("startups", "energia"),
                "positivo", 0.61, "normal", 52,
                List.of(
                    "La ronda permitirá construir una planta piloto en el País Vasco con capacidad para 200 MWh anuales.",
                    "Su tecnología promete un 30% más de densidad energética y tiempos de carga inferiores a 15 minutos.",
                    "El fabricante de automóviles que lidera la ronda firma además un acuerdo de suministro preferente."),
                List.of("País Vasco", "Serie B"),
                "Una joven empresa española especializada en baterías de estado sólido ha cerrado una ronda de financiación de serie B por valor de 80 millones de euros. El capital se destinará a la construcción de su primera planta piloto."),

            noticia("n7", "Amazon anuncia 14.000 despidos en su división corporativa para financiar inversión en IA",
                "Reuters Business", "reuters", "EN", true, "hace 2 h", 4, List.of("ia", "mercados"),
                "negativo", -0.55, "alta", 81,
                List.of(
                    "Los recortes afectan principalmente a mandos intermedios y equipos administrativos, no a operaciones logísticas.",
                    "La dirección enmarca la decisión como una \"reasignación de recursos hacia inteligencia artificial generativa\".",
                    "Es la mayor ronda de despidos de la compañía desde principios de 2023."),
                List.of("Amazon", "Despidos"),
                "Amazon ha confirmado un plan para eliminar aproximadamente 14.000 puestos corporativos. La compañía afirma que la medida busca liberar recursos para acelerar sus inversiones en inteligencia artificial generativa."),

            noticia("n8", "El precio del gas en Europa cae a mínimos de seis meses por el clima templado",
                "Bloomberg Markets", "bloomberg", "EN", true, "hace 3 h", 2, List.of("energia", "mercados"),
                "positivo", 0.44, "normal", 48,
                List.of(
                    "El contrato de referencia TTF holandés baja un 6% en la semana ante unas reservas de almacenamiento por encima del 90%.",
                    "Las temperaturas suaves reducen la demanda de calefacción anticipada.",
                    "Analistas advierten de que la volatilidad podría regresar con la primera ola de frío."),
                List.of("TTF", "Gas natural"),
                "Los precios del gas natural en Europa han descendido a su nivel más bajo en seis meses. El retroceso se explica por unos niveles de almacenamiento muy holgados y unas temperaturas más cálidas de lo habitual para la época."),

            noticia("n9", "DHL invierte 500 M€ en automatizar sus centros logísticos del sur de Europa",
                "Google Alert · logística", "galert", "ES", false, "hace 4 h", 3, List.of("logistica"),
                "neutral", 0.18, "normal", 39,
                List.of(
                    "El plan contempla robots móviles autónomos y clasificadoras de alta velocidad en seis hubs.",
                    "La compañía espera reducir un 25% los tiempos de procesamiento de paquetes.",
                    "Los sindicatos piden garantías sobre el impacto en el empleo."),
                List.of("DHL", "Automatización"),
                "DHL ha presentado un plan de inversión de 500 millones de euros para modernizar y automatizar su red de centros logísticos en el sur de Europa, con especial foco en España e Italia."),

            noticia("n10", "Anthropic lanza una nueva familia de modelos enfocada en agentes empresariales",
                "TechCrunch", "techcrunch", "EN", true, "hace 5 h", 3, List.of("ia", "startups"),
                "positivo", 0.58, "normal", 63,
                List.of(
                    "La compañía posiciona los nuevos modelos para tareas de orquestación y uso autónomo de herramientas.",
                    "Incluye mejoras notables en seguimiento de instrucciones y trabajo con documentos largos.",
                    "Se ofrecerá a través de las principales nubes y de una API directa."),
                List.of("Anthropic", "Agentes"),
                "Anthropic ha anunciado una nueva familia de modelos orientada específicamente a casos de uso empresariales que requieren agentes autónomos capaces de orquestar tareas complejas y usar herramientas externas.")
        );
    }

    private static Noticia noticia(String id, String titulo, String fuente, String fuenteId, String langOrig,
                                    boolean traducida, String hora, int tiempoLectura, List<String> sectores,
                                    String sentimiento, double scoreSent, String criticidad, int impacto,
                                    List<String> resumen, List<String> entidades, String cuerpo) {
        Noticia n = new Noticia();
        n.id = id; n.titulo = titulo; n.fuente = fuente; n.fuenteId = fuenteId; n.langOrig = langOrig;
        n.traducida = traducida; n.hora = hora; n.tiempoLectura = tiempoLectura; n.sectores = sectores;
        n.sentimiento = sentimiento; n.scoreSent = scoreSent; n.criticidad = criticidad; n.impacto = impacto;
        n.resumen = resumen; n.entidades = entidades; n.cuerpo = cuerpo;
        return n;
    }
}
