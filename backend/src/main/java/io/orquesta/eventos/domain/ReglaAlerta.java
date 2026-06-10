package io.orquesta.eventos.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "reglas_alerta")
public class ReglaAlerta {
    @Id
    public String id;

    public String nombre;

    @Column(length = 400)
    public String cond;

    @Column(length = 400)
    public String accion;

    public boolean activa;

    public ReglaAlerta() {}
}
