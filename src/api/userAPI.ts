import { POST_USER } from '../graphql/users/users.graphql';
import { client } from '../utils/config';

export const postUserData = (payload: any) => async () => {
  try {
    const response = await client.mutate({
      mutation: POST_USER,
      variables: payload,
    });
  } catch (error: any) {}
};
