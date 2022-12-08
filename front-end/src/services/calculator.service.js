import http from "../http-common";

class CalculatorDataService {
  getAll() {
    return http.get("/calculations");
  }

  get(id) {
    return http.get(`/calculations/${id}`);
  }

  create(data) {
    return http.post("/calculations", data);
  }

  update(id, data) {
    return http.put(`/calculations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/calculations/${id}`);
  }

  deleteAll() {
    return http.delete(`/calculations`);
  }

  findByTitle(title) {
    return http.get(`/calculations?title=${title}`);
  }
}

export default new CalculatorDataService();