import Vue from "vue";
import { toPath, last } from "lodash";
import VeeValidate from "vee-validate";
import { prettify } from "../utils/string.utils";

const dictionary = {
  en: {
    messages: {
      required(fieldName) {
        return `The ${prettify(last(toPath(fieldName)))} is required`;
      }
    }
  }
};

Vue.use(VeeValidate, {
  dictionary,
  delay: 100,
  useConstraintAttrs: false
});
