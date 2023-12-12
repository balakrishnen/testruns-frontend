import { fetchNotificationMessageFailure, fetchNotificationMessageStart, fetchNotificationMessageSuccess } from "../features/notificationMessageSlice";
import { GET_NOTIFICATION_MESSAGE } from '../graphql/notification_message/notification_message.graphql'
import { client } from '../utils/config';

export const fetchNotificationMessageData = (payload: any)=> async (dispatch: any) => {
    dispatch(fetchNotificationMessageStart());
    try {
        const response = await client.query({
            query: GET_NOTIFICATION_MESSAGE,
            variables: payload,
            fetchPolicy: 'network-only',
        })

        console.log('response',response)

        dispatch(fetchNotificationMessageSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchNotificationMessageFailure(error.message))   
    }
};

