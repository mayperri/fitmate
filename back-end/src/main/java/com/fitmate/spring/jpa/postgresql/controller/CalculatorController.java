package com.fitmate.spring.jpa.postgresql.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitmate.spring.jpa.postgresql.model.Calculator;
import com.fitmate.spring.jpa.postgresql.repository.CalculatorRespository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CalculatorController {

	@Autowired
	CalculatorRespository calculatorRespository;

	@GetMapping("/calculations")
	public ResponseEntity<List<Calculator>> getAllcalculations(@RequestParam(required = false) String title) {
		try {
			List<Calculator> calculations = new ArrayList<Calculator>();

			if (title == null)
				calculatorRespository.findAll().forEach(calculations::add);
			else
				calculatorRespository.findByTitleContaining(title).forEach(calculations::add);

			if (calculations.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(calculations, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/calculations/{id}")
	public ResponseEntity<Calculator> getcalculationById(@PathVariable("id") long id) {
		Optional<Calculator> calculationData = calculatorRespository.findById(id);

		if (calculationData.isPresent()) {
			return new ResponseEntity<>(calculationData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/calculations")
	public ResponseEntity<Calculator> createSubmission(@RequestBody Calculator calculator) {
		try {
			Calculator _calculation = calculatorRespository
					.save(new Calculator(calculator.getTarget(), calculator.getCaloriesBurned(),calculator.getTitle()));
			return new ResponseEntity<>(_calculation, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/calculations/{id}")
	public ResponseEntity<Calculator> updateSubmission(@PathVariable("id") long id, @RequestBody Calculator calculator) {
		Optional<Calculator> calculatorData = calculatorRespository.findById(id);

		if (calculatorData.isPresent()) {
			Calculator _calculate = calculatorData.get();
			_calculate.setTitle(calculator.getTitle());
			_calculate.setCaloriesBurned(calculator.getCaloriesBurned());
			//_calculate.setPublished(calculator.isPublished());
			return new ResponseEntity<>(calculatorRespository.save(_calculate), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/calculations/{id}")
	public ResponseEntity<HttpStatus> deletecalculation(@PathVariable("id") long id) {
		try {
			calculatorRespository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/calculations")
	public ResponseEntity<HttpStatus> deleteAllcalculations() {
		try {
			calculatorRespository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

//	@GetMapping("/calculations/published")
//	public ResponseEntity<List<Calculator>> findByPublished() {
//		try {
//			List<Calculator> submissions = calculatorRespository.findByPublished(true);
//
//			if (submissions.isEmpty()) {
//				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//			}
//			return new ResponseEntity<>(submissions, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
}