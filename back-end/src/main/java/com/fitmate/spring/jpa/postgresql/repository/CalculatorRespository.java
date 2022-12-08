package com.fitmate.spring.jpa.postgresql.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fitmate.spring.jpa.postgresql.model.Calculator;

public interface CalculatorRespository extends JpaRepository<Calculator, Long> {
  List<Calculator> findByTitleContaining(String title);
}
