import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '../features/userSlice';
import { POST_USER,GET_USER } from '../graphql/users/users.graphql';
import { client } from '../utils/config';

export const postUserData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: POST_USER,
      variables: payload,
    });
  } catch (error: any) {}
};

export const fetchGetUser = (payload: any) => async (dispatch: any) => {
  dispatch(fetchUserStart());
  try {
    const response = await client.query({
      query: GET_USER,
      variables: payload,
    });
    dispatch(fetchUserSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchUserFailure(error.message));
  }
};