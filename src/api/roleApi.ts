import {
    fetchRoleStart,
    fetchRoleSuccess,
    fetchRoleFailure,
} from '../features/roleSlice';
import { GET_ROLE } from '../graphql/role/role.graphql';
import { client } from '../utils/config';

export const fetchRoleData = () => async (dispatch: any) => {
    dispatch(fetchRoleStart());
    try {
        const response = await client.query({
            query: GET_ROLE
        });
        dispatch(fetchRoleSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchRoleFailure(error.message));
    }
};
