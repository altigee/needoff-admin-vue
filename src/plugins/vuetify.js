import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

import PageSpinner from "../components/PageSpinner";

Vue.use(Vuetify, {
  iconfont: "md",
  options: {
    customProperties: true
  }
});

Vue.component("PageSpinner", PageSpinner);
