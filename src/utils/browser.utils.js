import { capitalize } from "lodash";
import { prettify } from "./string.utils";

export function setDocPageTitle(page) {
  document.title = `Needoff admin | ${capitalize(prettify(page))}`;
}
