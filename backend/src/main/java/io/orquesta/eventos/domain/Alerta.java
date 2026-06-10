package io.orquesta.eventos.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "alertas")
public class Alerta {
    @Id
    public String id;

    @Column(length = 600)
    public String noticia;
    public String noticiaId;
    public int impacto;
    public String sector;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "alerta_canal", joinColumns = @JoinColumn(name = "alerta_id"))
    @Column(name = "canal")
    public List<String> canal = new ArrayList<>();

    public int destinatarios;
    public String hora;
    public String estado;

    @Column(length = 600)
    public String motivo;

    public Alerta() {}
}
