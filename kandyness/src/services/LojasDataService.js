import http from "../http-common";

class LojasDataService {
  getAll() {
    return http.get("/lojas");
  }

  get(id) {
    return http.get(`/lojas/${id}`);
  }

  byUserID(id) {
    return http.get(`/lojas/lojasByUserID/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/lojas", data);
  }
}

export default new LojasDataService();
