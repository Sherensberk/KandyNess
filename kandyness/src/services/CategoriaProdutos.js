import http from "../http-common";

class CatProdDataService {
  getAll() {
    return http.get("/categoriaprodutos");
  }

  get(id) {
    return http.get(`/categoriaprodutos/product/${id}`);
  }

  update(data) {
    return http.put(`/categoriaprodutos/product/`, data);
  }
}

export default new CatProdDataService();
