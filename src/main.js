import Vue from "vue";
import "./plugins/form-validate";
import "./plugins/vuetify";
import "./plugins/filters";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
