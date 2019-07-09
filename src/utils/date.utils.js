import { format } from "date-fns";

export function date(value, pattern = "DD MMM YYYY") {
  return format(value, pattern).toUpperCase();
}
