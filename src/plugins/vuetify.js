import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

import PageSpinner from "../components/PageSpinner";
import TransitionPage from "../components/TransitionPage";
import Datepicker from "../components/Datepicker";
import ErrorsAlert from "../components/ErrorsAlert";

Vue.use(Vuetify, {
  iconfont: "md",
  options: {
    customProperties: true
  }
});

Vue.component("PageSpinner", PageSpinner);
Vue.component("TransitionPage", TransitionPage);
Vue.component("Datepicker", Datepicker);
Vue.component("ErrorsAlert", ErrorsAlert);

Vue.component("Pass", {
  render() {
    return this.$scopedSlots.default(this.$attrs);
  }
});
