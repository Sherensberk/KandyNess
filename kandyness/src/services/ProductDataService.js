import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  getByLoja(loja) {
    return http.get(`/products/loja/${loja}`);
  }

  create(data) {
    console.log(data);
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findById(id) {
    return http.get(`/products?id=${id}`);
  }
}

export default new ProductDataService();
