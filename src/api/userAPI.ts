import { GET_USER, POST_USER, DELETE_USER, UPDATE_USER, GET_SINGLE_USER , LOGIN_USER,GET_USER_DATA} from '../graphql/users/users.graphql';
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '../features/userSlice';
import { fetchLoginUserFailure,fetchLoginUserStart,fetchLoginUserSuccess } from '../features/loginUserSlice';
import { client } from '../utils/config';

export const fetchUserData = (payload: any) => async (dispatch: any) => {
  dispatch(fetchUserStart());
  try {
    const response = await client.query({
      query: GET_USER,
      variables: payload,
      fetchPolicy: 'network-only',
    });
    dispatch(fetchUserSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchUserFailure(error.message));
  }
};
export const postUserData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: POST_USER,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteUserData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: DELETE_USER,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};
export const fetchSingleUserData = (payload: any) => async (dispatch: any) => {
  // dispatch(fetchUserStart());
  try {
    const response = await client.query({
      query: GET_SINGLE_USER,
      variables: payload,
      fetchPolicy: 'network-only',
    }); return response.data
    // dispatch(fetchUserSuccess(response.data));
  } catch (error: any) {
    return error
    // dispatch(fetchUserFailure(error.message));
  }
};

export const fetchUpdateUserData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_USER,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
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

export const fetchLoginUser = (payload: any) => async (dispatch: any) => {
  dispatch(fetchLoginUserStart());
  try {
    const response = await client.mutate({
      mutation: LOGIN_USER,
      variables: payload,
    });
    console.log(response.data);
    dispatch(fetchLoginUserSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchLoginUserFailure(error.message));
  }
};


export const fetchAllUser = () => async (dispatch: any) => {
  dispatch(fetchUserStart());
  try {
    const response = await client.query({
      query: GET_USER_DATA,
    });
    console.log(response.data);
    dispatch(fetchUserSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchUserFailure(error.message));
  }
};
