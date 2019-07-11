import Vue from "vue";
import pluralize from "pluralize";
import { format } from "../utils/date.utils";

Vue.filter("date", function(value, pattern = "DD MMM YYYY") {
  return format(value, pattern);
});

Vue.filter("pluralize", function(word = "", count = 1) {
  return pluralize(word, count);
});
