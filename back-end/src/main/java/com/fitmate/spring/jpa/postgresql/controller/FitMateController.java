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

import com.fitmate.spring.jpa.postgresql.model.FitMate;
import com.fitmate.spring.jpa.postgresql.repository.FitMateRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class FitMateController {

	@Autowired
	FitMateRepository fitmateRepository;

	@GetMapping("/submissions")
	public ResponseEntity<List<FitMate>> getAllSubmissions(@RequestParam(required = false) String activity) {
		try {
			List<FitMate> submissions = new ArrayList<FitMate>();

			if (activity == null)
				fitmateRepository.findAll().forEach(submissions::add);
			else
				fitmateRepository.findByActivityContaining(activity).forEach(submissions::add);

			if (submissions.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(submissions, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/submissions/{id}")
	public ResponseEntity<FitMate> getSubmissionById(@PathVariable("id") long id) {
		Optional<FitMate> submissionData = fitmateRepository.findById(id);

		if (submissionData.isPresent()) {
			return new ResponseEntity<>(submissionData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/submissions")
	public ResponseEntity<FitMate> createSubmission(@RequestBody FitMate fitmate) {
		try {
			FitMate _submission = fitmateRepository
					.save(new FitMate(fitmate.getActivity(), fitmate.getCalories(), false));
			return new ResponseEntity<>(_submission, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/submissions/{id}")
	public ResponseEntity<FitMate> updateSubmission(@PathVariable("id") long id, @RequestBody FitMate fitmate) {
		Optional<FitMate> tutorialData = fitmateRepository.findById(id);

		if (tutorialData.isPresent()) {
			FitMate _tutorial = tutorialData.get();
			_tutorial.setActivity(fitmate.getActivity());
			_tutorial.setCalories(fitmate.getCalories());
			_tutorial.setPublished(fitmate.isPublished());
			return new ResponseEntity<>(fitmateRepository.save(_tutorial), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/submissions/{id}")
	public ResponseEntity<HttpStatus> deleteSubmission(@PathVariable("id") long id) {
		try {
			fitmateRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/submissions")
	public ResponseEntity<HttpStatus> deleteAllSubmissions() {
		try {
			fitmateRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/submissions/published")
	public ResponseEntity<List<FitMate>> findByPublished() {
		try {
			List<FitMate> submissions = fitmateRepository.findByPublished(true);

			if (submissions.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(submissions, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
