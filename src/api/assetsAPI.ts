import {
  fetchAssetsStart,
  fetchAssetsSuccess,
  fetchAssetsFailure,
} from '../features/assetsSlice';
import { GET_ASSETS, POST_ASSETS } from '../graphql/assets/assets.graphql';
import { client } from '../utils/config';

export const fetchAssetsData = () => async (dispatch: any) => {
  dispatch(fetchAssetsStart());
  try {
    const response = await client.query({
      query: GET_ASSETS,
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
