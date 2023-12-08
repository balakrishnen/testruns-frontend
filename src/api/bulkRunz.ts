import {
    fetchbulkRunzStart,
    fetchbulkRunzSuccess,
    fetchbulkRunzFailure,
  } from '../features/bulkRunz'
  import {POST_BULKRUNZ} from '../graphql/bulkRunz/bulkRunz.graphql';
  import { client } from '../utils/config';
export const fetchbulkRunz = (payload: any) => async () => {
    try {
      const response = await client.mutate({
        mutation: POST_BULKRUNZ,
        variables: payload,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };