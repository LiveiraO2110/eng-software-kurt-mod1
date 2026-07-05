package com.example.prototipo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "edital_doc")
public class Docs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Column(nullable = false)
    @Getter
    private String link;

    @ManyToOne
    @JoinColumn(name = "edital_id")
    @Getter
    @Setter
    private Procurement procurement;

    public Docs(){}

    public Docs(String link){
        this.link = link;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Docs docs = (Docs) o;
        return Objects.equals(id, docs.id) && Objects.equals(link, docs.link) && Objects.equals(procurement, docs.procurement);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, link, procurement);
    }
}