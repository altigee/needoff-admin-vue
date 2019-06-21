import Vue from "vue";
import { format } from "date-fns";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("date", function(value) {
  return format(value, "DD MMM YYYY").toUpperCase();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
