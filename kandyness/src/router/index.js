import Vue from "vue";
import VueRouter from "vue-router";
//import express from "express";
// import {
//   showProducts,
//   showProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "@/product.js";

Vue.use(VueRouter);

const routes = [
  {
    path: `/loja`,
    name: "loja",
    component: () =>
      import(/* webpackChunkName: "test" */ `../views/paginaLojas.vue`),
  },
  {
    path: "/lojas",
    name: "lojas",
    component: () => import("../components/lojas.vue"),
  },
  // {
  //   path: "/products",
  //   component: () => showProducts,
  // },
  // {
  //   path: "/products/:id",
  //   component: () => showProductById,
  // },
  // {
  //   path: "/products",
  //   component: () => createProduct,
  // },
  // {
  //   path: "/products/:id",
  //   component: () => updateProduct,
  // },
  // {
  //   path: "/products/:id",
  //   component: () => deleteProduct,
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
