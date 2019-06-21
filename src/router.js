import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "workspaces" }
    },
    {
      path: "/auth",
      name: "auth",
      component: () =>
        import(/* webpackChunkName: "auth" */ "./views/Auth.vue"),
      children: [
        {
          path: "login",
          name: "login",
          beforeEnter: alreadyAuthedGuard,
          component: () =>
            import(/* webpackChunkName: "auth" */ "./views/Login.vue")
        }
      ]
    },
    {
      path: "/workspaces",
      name: "workspaces",
      beforeEnter: authGuard,
      component: () =>
        import(/* webpackChunkName: "workspaces" */ "./views/Workspaces.vue")
    },
    {
      path: "/workspaces/:id",
      name: "workspace",
      beforeEnter: authGuard,
      props: true,
      component: () =>
        import(/* webpackChunkName: "workspaces" */ "./views/Workspace.vue")
    }
  ]
});

/**
 * AUTH GUARD
 */
function authGuard(to, from, next) {
  if (store.getters.is_logged_in) {
    next();
  } else {
    next({ name: "login" });
  }
}

function alreadyAuthedGuard(to, from, next) {
  if (store.getters.is_logged_in) {
    next({ name: "home" });
  } else {
    next();
  }
}
