import { createRouter, createWebHistory } from "vue-router";
import store from "../store"
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "main",
      auth: true
    },
  },

  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/Help.vue"),
    meta: {
      layout: "main",
      auth: true
    },
  },

  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/Auth.vue"),
    meta: {
      layout: "auth",
      auth: false
    },
  },

  {
    path: "/request/:id",
    name: "Request",
    component: () => import("@/views/Request.vue"),
    meta: {
      layout: "main",
      auth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  const reqireAuth = to.meta.auth;
  if(reqireAuth && store.getters['auth/isAuthenticated']){ 
    next()
  }
  else if (reqireAuth && !store.getters['auth/isAuthenticated']){
    next('/auth?message=unauthorised')
  }
  else {
    next();
  }
});

export default router;
