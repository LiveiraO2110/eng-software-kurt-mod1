package com.example.prototipo.repository;

import com.example.prototipo.models.Docs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocsRepository extends JpaRepository<Docs, Long> {
}