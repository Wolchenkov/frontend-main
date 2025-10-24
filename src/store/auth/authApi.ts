import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	refetchOnFocus: true,
	endpoints: (builder) => ({
		getUser: builder.query<IMember, void>({
			query: () => ({ url: '/users/me' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getUserNotificationSettings: builder.query<IMemberNotificationSettings, void>({
			query: () => ({ url: '/users/getUserNotificationSettings' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		changeUserNotificationSettings: builder.mutation<IMember, any>({
			query: (body) => ({ method: 'PUT', url: '/users/changeUserNotificationSettings', body }),
			transformErrorResponse: checkAuthInResponse,
		}),
		changeUserInfo: builder.mutation<IMember, any>({
			query: ({ body }) => ({ method: 'POST', url: 'users/changeUserInfo', body }),
			transformErrorResponse: checkAuthInResponse,
		}),
		uploadAvatar: builder.mutation<IMember, any>({
			query: (body) => ({ method: 'POST', url: 'users/uploadAvatar', body }),
			transformErrorResponse: checkAuthInResponse,
		}),
		delAvatar: builder.mutation<IMember, void>({
			query: () => ({ method: 'DELETE', url: '/users/delete' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		logout: builder.mutation<IMember, void>({
			query: () => ({ method: 'DELETE', url: '/auth/logout' }),
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetUserNotificationSettingsQuery,
	useChangeUserInfoMutation,
	useDelAvatarMutation,
	useUploadAvatarMutation,
	useChangeUserNotificationSettingsMutation,
	useLogoutMutation,
} = authApi;
