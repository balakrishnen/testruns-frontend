import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query {
    get_all_assets(
      page: 1
      perPage: 5
      sortBy: "name"
      sortOrder: "decs"
      searchBy: "name"
      search: "f"
    ) {
      Assets {
        _id
        name
        asset_number
        department_id
        laboratory_id
        user_id
        perchased_date
        last_used_date
        status
        availability
        expiry_date
      }
      pageInfo {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const POST_ASSETS = gql`
  mutation Create_asset(
    $name: String!
    $asset_number: String!
    $department_id: String!
    $laboratory_id: String!
    $user_id: String!
    $perchased_date: String!
    $last_used_date: String!
    $status: Boolean!
    $availability: Boolean!
    $expiry_date: String!
  ) {
    create_asset(
      name: $name
      asset_number: $asset_number
      department_id: $department_id
      laboratory_id: $laboratory_id
      user_id: $user_id
      perchased_date: $perchased_date
      last_used_date: $last_used_date
      status: $status
      availability: $availability
      expiry_date: $expiry_date
    ) {
      _id
      name
      asset_number
      department_id
      laboratory_id
      user_id
      perchased_date
      last_used_date
      status
      availability
      expiry_date
    }
  }
`;
