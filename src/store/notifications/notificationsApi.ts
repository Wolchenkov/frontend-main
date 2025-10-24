import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const notificationsApi = createApi({
	reducerPath: 'notificationsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['notifications'],
	refetchOnMountOrArgChange: true,
	refetchOnFocus: true,
	endpoints: (builder) => ({
		getNotifications: builder.query<INotifications, void>({
			query: () => ({
				url: `/users/notifications`,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),
		readNotifications: builder.mutation<any, void>({
			query: () => ({
				method: 'PUT',
				url: `/users/readNotifications`,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),
		getMoreNotifications: builder.query<any, any>({
			query: (payload) => ({ url: payload }),
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const { useGetNotificationsQuery, useReadNotificationsMutation, useLazyGetMoreNotificationsQuery } =
	notificationsApi;
