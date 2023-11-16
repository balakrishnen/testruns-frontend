import { fetchProcedureStart,fetchProcedureFailure,fetchProcedureSuccess } from "../features/procedureSlice";
import {  POST_PROCEDURE ,GET_PROCEDURE, DELETE_PROCEDURE, UPDATE_PROCEDURE, GET_SINGLE_PROCEDURE} from '../graphql/procedure/procedure.graphql';
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
      fetchPolicy: 'network-only',
    });
    console.log('response',response);
    console.log('response',response);

    dispatch(fetchProcedureSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchProcedureFailure(error.message));
  }
};

export const deleteProcedureData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: DELETE_PROCEDURE,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const fetchSingleProcedureData = (payload: any) => async (dispatch: any) => {
  dispatch(fetchProcedureStart());
  try {
    const response = await client.query({
      query: GET_SINGLE_PROCEDURE,
      variables: payload,
      fetchPolicy: 'network-only',
    });
    dispatch(fetchProcedureSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchProcedureFailure(error.message));
  }
};
export const fetchUpdateProcedureData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_PROCEDURE,
      variables: payload,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};
