import Vue from "vue";
import VueRouter from "vue-router";
import store from "../index";

Vue.use(VueRouter);

const routes = [
  {
    path: `/loja`,
    name: "loja",
    component: () => import("@/views/paginaLojas.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/lojas",
    name: "lojas",
    component: () => import("@/components/lojas.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addProduct",
    name: "AddProduct",
    component: () => import("@/components/CRUD/product/AddProduct.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/carrinho",
    name: "carrinho",
    component: () => import("@/components/carrinho.vue"),
    meta: {
      // requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // Verifique a condição no estado do Vuex antes de acessar a rota
  if (
    !router.options.routes.some((route) => route.name === to.name) ||
    (to.meta.requiresAuth && Object.keys(store.state.usuario).length == 0)
  ) {
    // Condição não atendida, redirecione para outra rota ou realize alguma ação
    next("/login");
  } else {
    // Condição atendida, permita o acesso à rota
    next();
  }
});
export default router;
