package io.orquesta.eventos.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "fuentes")
public class Fuente {
    @Id
    public String id;

    public String nombre;
    public String url;
    public String lang;
    public boolean activa;
    public int intervalo;
    public String ultimaLectura;
    public int articulosHoy;
    public String salud;

    public Fuente() {}
}
