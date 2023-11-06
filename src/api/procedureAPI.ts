import { fetchProcedureStart,fetchProcedureFailure,fetchProcedureSuccess } from "../features/procedureSlice";
import {  POST_PROCEDURE ,GET_PROCEDURE} from '../graphql/procedure/procedure.graphql';
import { client } from '../utils/config';

export const postProcedureData = (payload: any) => async () => {
    try {
      const response = await client.mutate({
        mutation: POST_PROCEDURE,
        variables: payload,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
  
export const fetchProcedureData = (payload: any) => async (dispatch: any) => {
  dispatch(fetchProcedureStart());
  try {
    const response = await client.query({
      query: GET_PROCEDURE,
      variables: payload,
    });
    dispatch(fetchProcedureSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchProcedureFailure(error.message));
  }
};
