import { gql } from '@apollo/client';

// export const POST_USER = gql`
//   mutation Create_procedure(
//     $name: String!
//     $procedure_detials: String!
//     $department_id: String!
//     $laboratory_id: String!
//     $assect_id: String!
//     $user_id: String!
//     $procedure_number: String!
//   ) {
//     create_procedure(
//       name: $name
//       procedure_detials: $procedure_detials
//       department_id: $department_id
//       laboratory_id: $laboratory_id
//       assect_id: $assect_id
//       user_id: $user_id
//       procedure_number: $procedure_number
//     ) {
//       _id
//       name
//       procedure_number
//       procedure_detials
//       department_id
//       laboratory_id
//       assect_id
//       user_id
//       is_active
//       is_deleted
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const POST_USER = gql`
  mutation Create_user($name: String!) {
    create_user(name: $name) {
      _id
    }
  }
`;
