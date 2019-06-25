import { request } from "./gql";

export async function login({ email, password }) {
  const res = await request(/* GraphQL */ `
    mutation {
      login(email: "${email}", password: "${password}") {
        ok
        accessToken
      }
    }`);

  return res.login;
}

export async function register({ email, password, userData }) {
  const res = await request(/* GraphQL */ `
    mutation {
      register(
        email: "${email}",
        password: "${password}",
        userData: {
          firstName: "${userData.firstName}",
          lastName: "${userData.lastName}"}
      ) {
        accessToken
      }
    }`);

  return res.register;
}
