import { GraphQLClient } from "graphql-request";
import store from "../store";

export async function request(query, { variables } = {}) {
  const client = new GraphQLClient(getBaseUrl(), {
    headers: getBaseHeaders()
  });

  try {
    return await client.request(query, variables);
  } catch (error) {
    if (isTokenExpiredError(error)) {
      store.dispatch("logoutUser");
    }

    throw error;
  }
}

export function getBaseUrl() {
  return `http://nmarchuk.pythonanywhere.com/graphql`;
}

export function getBaseHeaders() {
  return {
    authorization: `Bearer ${store.state.access_token}`
  };
}

function isTokenExpiredError(error) {
  const { errors } = error.response;
  const messages = errors.map(err => err.message);
  const is_token_expired = messages.includes("Invalid token.");
  return is_token_expired;
}
