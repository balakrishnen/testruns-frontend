import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const customHeaders = {
  Authorization: `Bearer ${ typeof window !== 'undefined' && window.localStorage.getItem('accessToken')}`,
};

const authorizedLink: any = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...customHeaders,
    },
  };
});

// const unAuthorizedLink: any = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//     },
//   };
// });

// Create the Apollo Client instance with the HTTP and auth links
export const client = new ApolloClient({
  link: authorizedLink.concat(httpLink),
  // window?.localStorage?.getItem("isLoggedIn") === "true"
  //   ? authorizedLink.concat(httpLink)
  //   : unAuthorizedLink.concat(httpLink),
  cache: new InMemoryCache(),
});
