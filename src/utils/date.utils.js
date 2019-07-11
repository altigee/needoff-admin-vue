import { format as formatFns } from "date-fns";

export function format(value, pattern = "DD MMM YYYY") {
  return formatFns(value, pattern);
}

export function toISO(value) {
  return formatFns(value, "YYYY-MM-DD");
}
