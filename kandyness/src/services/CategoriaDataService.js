import http from "../http-common";

class CategoriaDataService {
  getAll() {
    return http.get("/categorias");
  }
}

export default new CategoriaDataService();
