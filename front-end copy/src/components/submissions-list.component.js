import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";
import { Link } from "react-router-dom";

export default class SubmissionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchActivity = this.onChangeSearchActivity.bind(this);
    this.retrieveSubmissions = this.retrieveSubmissions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubmission = this.setActiveSubmission.bind(this);
    this.removeAllSubmissions = this.removeAllSubmissions.bind(this);
    this.searchActivity = this.searchActivity.bind(this);

    this.state = {
      submissions: [],
      currentSubmission: null,
      currentIndex: -1,
      searchActivity: ""
    };
  }

  componentDidMount() {
    this.retrieveSubmissions();
  }

  onChangeSearchActivity(e) {
    const searchActivity = e.target.value;

    this.setState({
      searchActivity: searchActivity
    });
  }

  retrieveSubmissions() {
    SubmissionDataService.getAll()
      .then(response => {
        this.setState({
          submissions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSubmissions();
    this.setState({
      currentSubmission: null,
      currentIndex: -1
    });
  }

  setActiveSubmission(submission, index) {
    this.setState({
      currentSubmission: submission,
      currentIndex: index
    });
  }

  removeAllSubmissions() {
    SubmissionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchActivity() {
    SubmissionDataService.findByActivity(this.state.searchActivity)
      .then(response => {
        this.setState({
          submissions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchActivity, submissions, currentSubmission, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Activity"
              value={searchActivity}
              onChange={this.onChangeSearchActivity}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchActivity}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Calorie Log</h4>

          <ul className="list-group">
            {submissions &&
              submissions.map((submission, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSubmission(submission, index)}
                  key={index}
                >
                  {submission.activity}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSubmissions}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSubmission ? (
            <div>
              <h4>Submission</h4>
              <div>
                <label>
                  <strong>Activity:</strong>
                </label>{" "}
                {currentSubmission.activity}
              </div>
              <div>
                <label>
                  <strong>Calories:</strong>
                </label>{" "}
                {currentSubmission.calories}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSubmission.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/submissions/" + currentSubmission.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a calorie submission...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}