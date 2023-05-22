import http from "../http-common";

class LojasDataService {
  getAll() {
    return http.get("/lojas");
  }

  get(id) {
    return http.get(`/lojas/${id}`);
  }
}

export default new LojasDataService();
