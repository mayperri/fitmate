package com.fitmate.spring.jpa.postgresql.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fitmate.spring.jpa.postgresql.model.FitMate;

public interface FitMateRepository extends JpaRepository<FitMate, Long> {
  List<FitMate> findByPublished(boolean published);

  List<FitMate> findByActivityContaining(String activity);
}
