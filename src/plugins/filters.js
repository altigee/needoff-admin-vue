import Vue from "vue";
import { format } from "date-fns";
import pluralize from "pluralize";

Vue.filter("date", function(value, pattern = "DD MMM YYYY") {
  return format(value, pattern).toUpperCase();
});

Vue.filter("pluralize", function(word = "", count = 1) {
  return pluralize(word, count);
});
