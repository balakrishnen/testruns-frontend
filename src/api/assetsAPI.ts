import {
  fetchAssetsStart,
  fetchAssetsSuccess,
  fetchAssetsFailure,
} from '../features/assetsSlice';
import { GET_ASSETS_NAMES, GET_ASSETS, POST_ASSETS, DELETE_ASSETS, GET_SINGLE_ASSETS ,UPDATE_ASSETS} from '../graphql/assets/assets.graphql';
import { client } from '../utils/config';

export const fetchAssetsData = (payload: any) => async (dispatch: any) => {
  dispatch(fetchAssetsStart());
  try {
    const response = await client.query({
      query: GET_ASSETS,
      variables: payload,
      fetchPolicy: 'network-only',
    });
    dispatch(fetchAssetsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchAssetsFailure(error.message));
  }
};

export const postAssetsData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: POST_ASSETS,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteAssetsData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: DELETE_ASSETS,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const fetchSingleAssetsData = (payload: any) => async (dispatch: any) => {
  dispatch(fetchAssetsStart());
  try {
    const response = await client.query({
      query: GET_SINGLE_ASSETS,
      variables: payload,
      fetchPolicy: 'network-only',
    });
    dispatch(fetchAssetsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchAssetsFailure(error.message));
  }
};

export const fetchUpdateAssetsData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_ASSETS,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};
export const fetchAssetsName = () => async (dispatch: any) => {
  dispatch(fetchAssetsStart());
  try {
    const response = await client.query({
      query: GET_ASSETS_NAMES,
      fetchPolicy: 'network-only',
    });
    dispatch(fetchAssetsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchAssetsFailure(error.message));
  }
};