import { GraphQLClient } from "graphql-request";
import store from "../store";

export async function request(query, { variables } = {}) {
  const client = new GraphQLClient(getBaseUrl(), {
    headers: getBaseHeaders()
  });

  try {
    return await client.request(query, variables);
  } catch (erroredResponse) {
    const { response } = erroredResponse;

    if (!response) {
      store.dispatch("networkError");
      throw erroredResponse;
    }

    if (isTokenExpiredError(response.errors)) {
      store.dispatch("logoutUser");
    }

    throw erroredResponse;
  }
}

export function getBaseUrl() {
  // return `http://nmarchuk.pythonanywhere.com/graphql`;
  return `http://localhost:3344/graphql`;
}

export function getBaseHeaders() {
  return {
    authorization: `Bearer ${store.state.access_token}`
  };
}

function isTokenExpiredError(errors) {
  const messages = errors.map(err => err.message);
  const is_token_expired = messages.includes("Invalid token.");
  return is_token_expired;
}
