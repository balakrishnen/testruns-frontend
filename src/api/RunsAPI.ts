import {
    fetchRunsStart,
    fetchRunsSuccess,
    fetchRunsFailure,
} from '../features/runsSlice';
import { GET_RUNS } from '../graphql/runs/runs.graphql';
import { client } from '../utils/config';

export const fetchRunsData = () => async (dispatch: any) => {
    dispatch(fetchRunsStart());
    try {
        const response = await client.query({
            query: GET_RUNS
        });
        console.log("reponse.data",response.data)
        dispatch(fetchRunsSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchRunsFailure(error.message));
    }
};

  
//   export const postAssetsData = (payload: any) => async () => {
//     try {
//       const response = await client.mutate({
//         mutation: POST_RUNS,
//         variables: payload,
//       });
//       console.log(response);
//     } catch (error: any) {
//       console.log(error);
//     }
//   };
  
//   export const deleteAssetsData = (payload: any) => async () => {
//     try {
//       const response = await client.mutate({
//         mutation: DELETE_RUNS,
//         variables: payload,
//       });
//       console.log(response);
//     } catch (error: any) {
//       console.log(error);
//     }
//   };
  
//   export const fetchSingleAssetsData = (payload: any) => async (dispatch: any) => {
//     dispatch(fetchAssetsStart());
//     try {
//       const response = await client.query({
//         query: GET_SINGLE_RUNS,
//         variables: payload,
//       });
//       dispatch(fetchAssetsSuccess(response.data));
//     } catch (error: any) {
//       dispatch(fetchAssetsFailure(error.message));
//     }
//   };
  
//   export const fetchUpdateAssetsData = (payload: any) => async (dispatch: any) => {
//     dispatch(fetchAssetsStart());
//     try {
//       const response = await client.query({
//         query: UPDATE_ASSETS,
//         variables: payload,
//       });
//       dispatch(fetchAssetsSuccess(response.data));
//     } catch (error: any) {
//       dispatch(fetchAssetsFailure(error.message));
//     }
//   };