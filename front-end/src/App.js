import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSubmission from "./components/add-submission.component";
import Submission from "./components/submission.component";
import SubmissionsList from "./components/submissions-list.component";
import Calculator from "./components/calculator.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/submissions"} className="navbar-brand">
            FitMate
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/submissions"} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Calorie Entry
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/calculator"} className="nav-link">
                Calculator
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<SubmissionsList/>} />
            <Route path="/submissions" element={<SubmissionsList/>} />
            <Route path="/add" element={<AddSubmission/>} />
            <Route path="/submissions/:id" element={<Submission/>} />
            <Route path="/calculator" element={<Calculator/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
