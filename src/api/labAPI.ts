import { fetchLabStart,fetchLabFailure,fetchLabSuccess } from '../features/labSlice';
import { GET_LABS } from '../graphql/lab/lab.graphql';
  import { client } from '../utils/config';
  
  export const fetchLabData = () => async (dispatch: any) => {
    dispatch(fetchLabStart());
    try {
      const response = await client.query({
        query: GET_LABS
      });
      dispatch(fetchLabSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchLabFailure(error.message));
    }
  };