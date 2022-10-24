import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/post",
    name: "post create",
    component: () =>
      import(/* webpackChunkName: "post create" */ "../views/PostCreateView.vue"),
  },
  {
    path: "/post/:id",
    name: "post detail",
    component: () =>
      import(/* webpackChunkName: "post detail" */ "../views/PostDetailView.vue"),
  },
  {
    path: "/post/update/:id",
    name: "post update",
    component: () =>
      import(/* webpackChunkName: "post update" */ "../views/PostUpdateView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
