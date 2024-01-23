import {
  fetchDepartmentStart,
  fetchDepartmentSuccess,
  fetchDepartmentFailure,
} from '../features/departmentSlice';
import { GET_DEPARTMENT } from '../graphql/department/department.graphql';
import { client } from '../utils/config';

export const fetchDepartmentData = (payload:any) => async (dispatch: any) => {
  dispatch(fetchDepartmentStart());
  try {
    const response = await client.query({
      query: GET_DEPARTMENT,
      variables: payload,
      fetchPolicy: 'network-only',
    });
    dispatch(fetchDepartmentSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchDepartmentFailure(error.message));
  }
};
