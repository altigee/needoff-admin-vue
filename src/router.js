import Vue from "vue";
import Router from "vue-router";
import { setDocPageTitle } from "./utils/browser.utils";
import store from "./store";

Vue.use(Router);

const router = new Router({
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
      redirect: { name: "login" },
      component: () =>
        import(/* webpackChunkName: "auth" */ "./views/Auth.vue"),
      children: [
        {
          path: "login",
          name: "login",
          meta: { layout: "simple" },
          beforeEnter: alreadyAuthedGuard,
          component: () =>
            import(/* webpackChunkName: "auth" */ "./views/Login.vue")
        },
        {
          path: "register",
          name: "register",
          meta: { layout: "simple" },
          beforeEnter: alreadyAuthedGuard,
          component: () =>
            import(/* webpackChunkName: "auth" */ "./views/Register.vue")
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
      path: "/workspaces/new",
      name: "add_workspace",
      beforeEnter: authGuard,
      component: () =>
        import(/* webpackChunkName: "workspaces" */ "./views/WorkspaceAdd.vue")
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
 * Update document title with name for better back navigation
 */
router.afterEach(({ name }) => {
  setDocPageTitle(name);
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

export default router;
