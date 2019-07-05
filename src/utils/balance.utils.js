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
