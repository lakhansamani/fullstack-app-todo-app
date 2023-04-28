import { useAuthorizer } from "@authorizerdev/authorizer-react";
import { Provider, Client, cacheExchange, fetchExchange } from "urql";
import Todo from "../components/todo";

export default function Dashboard() {
  const { token } = useAuthorizer();
  return (
    <Provider
      value={
        new Client({
          url: "https://hasura-railway-production-a1c6.up.railway.app/v1/graphql",
          exchanges: [cacheExchange, fetchExchange],
          fetchOptions: () => {
            return {
              headers: {
                authorization: token ? `Bearer ${token.id_token}` : "",
              },
            };
          },
        })
      }
    >
      <Todo />
    </Provider>
  );
}
