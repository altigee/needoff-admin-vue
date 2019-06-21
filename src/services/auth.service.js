import { request } from "./gql";

export function login({ email, password }) {
  const query = `
    mutation {
      login(email: "${email}", password: "${password}") {
        ok
        accessToken
      }
    }`;

  return request(query);
}
