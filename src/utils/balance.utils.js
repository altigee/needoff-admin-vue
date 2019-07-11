import { map } from "lodash";

export const TYPES = {
  VACATION_PAID: "VACATION_PAID",
  VACATION_UNPAID: "VACATION_UNPAID",
  SICK_LEAVE: "SICK_LEAVE",
  WFH: "WFH"
};

export const THEME = {
  [TYPES.VACATION_PAID]: "indigo--text text--accent-4",
  [TYPES.VACATION_UNPAID]: "cyan--text text--accent-4",
  [TYPES.SICK_LEAVE]: "teal--text text--accent-4",
  [TYPES.WFH]: "grey"
};

export const LABEL = {
  [TYPES.VACATION_PAID]: "Paid Vacation",
  [TYPES.VACATION_UNPAID]: "Unpaid Vacation",
  [TYPES.SICK_LEAVE]: "Sick Leave",
  [TYPES.WFH]: "WFH"
};

export function getLabel(type = "") {
  return LABEL[type] || "";
}

export const typeOptions = map(TYPES, type => ({
  text: getLabel(type),
  value: type
}));
