import {
    fetchDepartmentStart,
    fetchDepartmentSuccess,
    fetchDepartmentFailure,
  } from '../features/departmentSlice';
  import { GET_DEPARTMENT } from '../graphql/department/department.graphql';
  import { client } from '../utils/config';
  
  export const fetchDepartmentData = () => async (dispatch: any) => {
    dispatch(fetchDepartmentStart());
    try {
      const response = await client.query({
        query: GET_DEPARTMENT
      });
      dispatch(fetchDepartmentSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchDepartmentFailure(error.message));
    }
  };
