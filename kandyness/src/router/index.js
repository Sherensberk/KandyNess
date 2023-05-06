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
];

const router = new VueRouter({
  routes,
});

export default router;
