import {
    fetchRunsStart,
    fetchRunsSuccess,
    fetchRunsFailure,
} from '../features/myPageSlice';
import {
    GET_RUNS,
} from '../graphql/runs/runs.graphql';
import { client } from '../utils/config';

export const fetchMyPageRunsData = (payload: any) => async (dispatch: any) => {
    dispatch(fetchRunsStart());
    try {
        const response = await client.query({
            query: GET_RUNS,
            variables: payload,
            fetchPolicy: 'network-only',
        });
        dispatch(fetchRunsSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchRunsFailure(error.message));
    }
};


