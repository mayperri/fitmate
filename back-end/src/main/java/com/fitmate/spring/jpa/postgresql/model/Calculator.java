package com.fitmate.spring.jpa.postgresql.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "calculations")
public class Calculator {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "target")
	private int target;

	@Column(name = "calories_burned")
	private int calories_burned;

	@Column(name = "title")
	private String title;

	public Calculator() {

	}

	public Calculator(int target, int calories_burned, String title) {
		this.target = target;
		this.calories_burned = calories_burned;
		this.title = title;
	}

	public long getId() {
		return id;
	}

	public int getTarget() {
		return target;
	}

	public void setTarget(int target) {
		this.target = target;
	}

	public int getCaloriesBurned() {
		return calories_burned;
	}

	public void setCaloriesBurned(int calories_burned) {
		this.calories_burned = calories_burned;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String isTitle) {
		this.title = isTitle;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", calorie target=" + target + ", calories burned=" + calories_burned + ", activity name=" + title + "]";
	}

}