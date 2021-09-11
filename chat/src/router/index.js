import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/ChatsList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat/:chatId",
    name: "Chat",
    component: () => import("../views/ChatPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/new",
    name: "CreateChat",
    component: () => import("../views/CreateChat.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
