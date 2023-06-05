import http from "../http-common";

class UsersDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  getByEmail(email) {
    return http.get(`/users/email/${email}`);
  }

  create(data) {
    console.log(data);
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findById(id) {
    return http.get(`/users?id=${id}`);
  }
}

export default new UsersDataService();
