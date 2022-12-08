import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";
import { withRouter } from '../common/with-router';

class Submission extends Component {
  constructor(props) {
    super(props);
    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.getSubmission = this.getSubmission.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSubmission = this.updateSubmission.bind(this);
    this.deleteSubmission = this.deleteSubmission.bind(this);

    this.state = {
      currentSubmission: {
        id: null,
        activity: "",
        calories: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSubmission(this.props.router.params.id);
  }

  onChangeActivity(e) {
    const activity = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSubmission: {
          ...prevState.currentSubmission,
          activity: activity
        }
      };
    });
  }

  onChangeCalories(e) {
    const calories = e.target.value;
    
    this.setState(prevState => ({
      currentSubmission: {
        ...prevState.currentSubmission,
        calories: calories
      }
    }));
  }

  getSubmission(id) {
    SubmissionDataService.get(id)
      .then(response => {
        this.setState({
          currentSubmission: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSubmission.id,
      activity: this.state.currentSubmission.activity,
      calories: this.state.currentSubmission.calories,
      published: status
    };

    SubmissionDataService.update(this.state.currentSubmission.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSubmission: {
            ...prevState.currentSubmission,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSubmission() {
    SubmissionDataService.update(
      this.state.currentSubmission.id,
      this.state.currentSubmission
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The submission was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSubmission() {    
    SubmissionDataService.delete(this.state.currentSubmission.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/submissions');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSubmission } = this.state;

    return (
      <div>
        {currentSubmission ? (
          <div className="edit-form">
            <h4>Submissions</h4>
            <form>
              <div className="form-group">
                <label htmlFor="activty">Activity</label>
                <input
                  type="text"
                  className="form-control"
                  id="activity"
                  value={currentSubmission.activity}
                  onChange={this.onChangeActivity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input
                  type="text"
                  className="form-control"
                  id="calories"
                  value={currentSubmission.calories}
                  onChange={this.onChangeCalories}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSubmission.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentSubmission.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSubmission}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSubmission}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Submission...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Submission);

