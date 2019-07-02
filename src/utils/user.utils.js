import { compact } from "lodash";

export function userInitials(user) {
  return user
    ? compact([user.firstName[0], user.lastName[0]])
        .join("")
        .toUpperCase()
    : "";
}

export function userName(user) {
  return user ? compact([user.firstName, user.lastName]).join(" ") : "";
}
