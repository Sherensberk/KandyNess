import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: `/loja`,
    name: "loja",
    component: () => import("@/views/paginaLojas.vue"),
  },
  {
    path: "/lojas",
    name: "lojas",
    component: () => import("@/components/lojas.vue"),
  },
  {
    path: "/products",
    alias: "/productssss",
    component: () => import("@/components/CRUD/product/ProductList.vue"),
  },
  {
    path: "/product/:id",
    name: "product-details",
    component: () => import("@/components/CRUD/product/Product.vue"),
  },
  {
    path: "/addProduct",
    name: "product-add",
    component: () => import("@/components/CRUD/product/AddProduct.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
