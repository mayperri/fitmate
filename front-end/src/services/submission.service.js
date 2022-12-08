import http from "../http-common";

class SubmissionDataService {
  getAll() {
    return http.get("/submissions");
  }

  get(id) {
    return http.get(`/submissions/${id}`);
  }

  create(data) {
    return http.post("/submissions", data);
  }

  update(id, data) {
    return http.put(`/submissions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/submissions/${id}`);
  }

  deleteAll() {
    return http.delete(`/submissions`);
  }

  findByActivity(activity) {
    return http.get(`/submissions?activity=${activity}`);
  }
}

export default new SubmissionDataService();
