import {
    fetchRunsStart,
    fetchRunsSuccess,
    fetchRunsFailure,
} from '../features/runsSlice';
import { GET_RUNS, POST_RUNS, DELETE_RUNS, GET_SINGLE_RUNS ,UPDATE_RUNS } from '../graphql/runs/runs.graphql';
import { client } from '../utils/config';

export const fetchRunsData = (payload: any) => async (dispatch: any) => {
    dispatch(fetchRunsStart());
    try {
        const response = await client.query({
            query: GET_RUNS,
            variables: payload,
        });
        console.log("reponse.data",response.data)
        dispatch(fetchRunsSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchRunsFailure(error.message));
    }
};

  
  export const postRunsData = (payload: any) => async () => {
    try {
      const response = await client.mutate({
        mutation: POST_RUNS,
        variables: payload,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
  export const deleteRunsData = (payload: any) => async () => {
    try {
      const response = await client.mutate({
        mutation: DELETE_RUNS,
        variables: payload,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
  export const fetchSingleRunsData = (payload: any) => async (dispatch: any) => {
    dispatch(fetchRunsStart());
    try {
      const response = await client.query({
        query: GET_SINGLE_RUNS,
        variables: payload,
      });
      dispatch(fetchRunsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchRunsFailure(error.message));
    }
  };
  
  export const fetchUpdateRunsData = (payload: any) => async () => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_RUNS,
        variables: payload,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
  
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