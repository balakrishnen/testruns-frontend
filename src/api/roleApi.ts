import {
    fetchRoleStart,
    fetchRoleSuccess,
    fetchRoleFailure,
} from '../features/roleSlice';
import { GET_ALL_ROLE, GET_ROLE, UPDATE_ROLE} from '../graphql/role/role.graphql';
import { client } from '../utils/config';

export const fetchRoleData = () => async (dispatch: any) => {
    dispatch(fetchRoleStart());
    try {
        const response = await client.query({
            query: GET_ALL_ROLE
        });

        dispatch(fetchRoleSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchRoleFailure(error.message));
    }
};
export const fetchSingleRoleData = (payload: any) => async (dispatch: any) => {
    dispatch(fetchRoleStart());
    try {
        const response = await client.query({
            query: GET_ROLE,
            variables: payload,
        });
        dispatch(fetchRoleSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchRoleFailure(error.message));
    }
};

export const fetchUpdateRoleData = (payload: any) => async () => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_ROLE,
        variables: payload,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
