import Vue from "vue";
import Vuetify from "vuetify/lib";

import PageSpinner from "../components/PageSpinner";
import TransitionPage from "../components/TransitionPage";
import Datepicker from "../components/Datepicker";
import ErrorsAlert from "../components/ErrorsAlert";

Vue.component("PageSpinner", PageSpinner);
Vue.component("TransitionPage", TransitionPage);
Vue.component("Datepicker", Datepicker);
Vue.component("ErrorsAlert", ErrorsAlert);

Vue.component("Pass", {
  render() {
    return this.$scopedSlots.default(this.$attrs);
  }
});

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: "mdi",
  options: {
    customProperties: true
  }
});
