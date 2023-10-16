import {
    fetchAssetsStart,
    fetchAssetsSuccess,
    fetchAssetsFailure,
  } from "../features/assetsSlice";
  import { GET_ASSETS } from "../graphql/queries/assetsQuery";
  import { client } from "../utils/config";
  
  export const fetchAssetsData = (payload: any) => async (dispatch: any) => {
    dispatch(fetchAssetsStart());
    try {
      const response = await client.query({
        query: GET_ASSETS,
        variables: payload
      });
      dispatch(fetchAssetsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchAssetsFailure(error.message));
    }
  };
  