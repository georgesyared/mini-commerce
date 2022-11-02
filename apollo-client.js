import { ApolloClient, InMemoryCache } from "@apollo/client";

// to make connect between front and back end
const client = new ApolloClient({
  uri: "https://api-eu-west-2.hygraph.com/v2/cl9yqi55v26yz01tbbnkz9u65/master",
  cache: new InMemoryCache(),
});

export default client;
