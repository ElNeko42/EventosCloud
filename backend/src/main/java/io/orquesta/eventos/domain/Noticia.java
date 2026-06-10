package io.orquesta.eventos.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "noticias")
public class Noticia {
    @Id
    public String id;

    @Column(length = 600)
    public String titulo;

    public String fuente;
    public String fuenteId;
    public String langOrig;
    public boolean traducida;
    public String hora;
    public int tiempoLectura;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "noticia_sectores", joinColumns = @JoinColumn(name = "noticia_id"))
    @Column(name = "sector")
    public List<String> sectores = new ArrayList<>();

    public String sentimiento;
    public double scoreSent;
    public String criticidad;
    public int impacto;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "noticia_resumen", joinColumns = @JoinColumn(name = "noticia_id"))
    @Column(name = "punto", length = 1000)
    @OrderColumn(name = "orden")
    public List<String> resumen = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "noticia_entidades", joinColumns = @JoinColumn(name = "noticia_id"))
    @Column(name = "entidad")
    public List<String> entidades = new ArrayList<>();

    @Lob
    @Column(length = 8000)
    public String cuerpo;

    public Noticia() {}
}
