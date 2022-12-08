import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";

export default class AddSubmission extends Component {
  constructor(props) {
    super(props);
    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.saveSubmission = this.saveSubmission.bind(this);
    this.newSubmission = this.newSubmission.bind(this);

    this.state = {
      id: null,
      activity: "",
      calories: "", 
      published: false,

      submitted: false
    };
  }

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value
    });
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value
    });
  }

  saveSubmission() {
    var data = {
      activity: this.state.activity,
      calories: this.state.calories
    };

    SubmissionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          activity: response.data.activity,
          calories: response.data.calories,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSubmission() {
    this.setState({
      id: null,
      activity: "",
      calories: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSubmission}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="activity">Activity</label>
              <input
                type="text"
                className="form-control"
                id="activity"
                required
                value={this.state.activity}
                onChange={this.onChangeActivity}
                name="activity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="calories">Calories</label>
              <input
                type="text"
                className="form-control"
                id="calories"
                required
                value={this.state.calories}
                onChange={this.onChangeCalories}
                name="calories"
              />
            </div>

            <button onClick={this.saveSubmission} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
