package com.fitmate.spring.jpa.postgresql.model;

import javax.persistence.*;

@Entity
@Table(name = "submissions")
public class FitMate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "activity")
	private String activity;

	@Column(name = "calories")
	private String calories;

	@Column(name = "published")
	private boolean published;

	public FitMate() {

	}

	public FitMate(String activity, String calories, boolean published) {
		this.activity = activity;
		this.calories = calories;
		this.published = published;
	}

	public long getId() {
		return id;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public String getCalories() {
		return calories;
	}

	public void setCalories(String calories) {
		this.calories = calories;
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean isPublished) {
		this.published = isPublished;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", activity=" + activity + ", calories=" + calories + ", published=" + published + "]";
	}

}

