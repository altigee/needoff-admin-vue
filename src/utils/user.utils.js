import { compact, map } from "lodash";

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

export function getUserOptions(users) {
  return map(users, user => ({
    text: userName(user),
    value: user.userId,
    email: user.email
  }));
}
