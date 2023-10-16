import { gql } from "@apollo/client";

export const GET_ASSETS = gql`
  query Products {
    products {
      id
      name
      price
    }
  }
`;

// Varibales

// {
//   "productId": 1,
// }
