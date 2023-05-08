import Vue from "vue";
import VueRouter from "vue-router";

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
    component: () => import("../components/lojas.vue"), //! merge componets on a view, and change this later
  },
];

const router = new VueRouter({
  routes,
});

export default router;
