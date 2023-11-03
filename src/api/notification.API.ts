import {
    fetchNotificationStart,
    fetchNotificationSuccess,
    fetchNotificationFailure,
} from '../features/notificationSlice';
import { GET_NOTIFICATION } from '../graphql/notification/notification.graphql';
import { client } from '../utils/config';

export const fetchNotificationData = () => async (dispatch: any) => {
    dispatch(fetchNotificationStart());
    try {
        const response = await client.query({
            query: GET_NOTIFICATION
        });
        dispatch(fetchNotificationSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchNotificationFailure(error.message));
    }
};
