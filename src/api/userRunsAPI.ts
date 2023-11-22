import { POST_USER_RUNS } from '../graphql/userRuns/userRunz.graphql';
import { client } from '../utils/config';

export const postUserRunsData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: POST_USER_RUNS,
      variables: payload,
    });console.log(response);
} catch (error: any) {
  console.log(error);
}
}