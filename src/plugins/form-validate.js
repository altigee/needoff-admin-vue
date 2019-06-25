import Vue from "vue";
import { toPath, tail } from "lodash";
import VeeValidate, { Validator } from "vee-validate";
import { prettify } from "../utils/string.utils";
Vue.use(VeeValidate);

const dict = {
  en: {
    messages: {
      required: fieldName =>
        `The ${prettify(tail(toPath(fieldName)))} is required`
    }
  }
};

Validator.localize(dict);
