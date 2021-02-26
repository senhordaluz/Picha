import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const base_url = process.env.VUE_APP_BASE_URL || process.env.BASE_URL;

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  }
  // {
  //   path: "/erro/404",
  //   name: "error.404",
  //   props: {
  //     code: 404
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "error" */ "@/views/error/Handler.vue"
  //     )
  // },
  // {
  //   path: "*",
  //   redirect: "/error/404"
  // }
];

const router = new VueRouter({
  mode: "history",
  base: base_url,
  routes
});

export default router;
