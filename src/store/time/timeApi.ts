import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';
import { projectsApi } from '../projects/projectsApi';
import { myWorkApi } from '../myWork/myWorkApi';

export const timeApi = createApi({
	reducerPath: 'timeApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['TimeRecords'],
	endpoints: (builder) => ({
		switchTimer: builder.mutation({
			query: (body) => ({
				url: '/time/switchTimer',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
			// async onQueryStarted(_, { dispatch, queryFulfilled }) {
			// 	try {
			// 		await queryFulfilled;
			// 		dispatch(tasksApi.util.invalidateTags(['Tasks']));
			// 	} catch (err) {
			// 		return;
			// 	}
			// },
		}),

		deleteTimer: builder.mutation({
			query: (body) => ({
				url: '/time/removeTimer',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		recordTimer: builder.mutation({
			query: (body) => ({
				url: '/time/store',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(projectsApi.util.invalidateTags(['TimeRecords']));
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		updateTime: builder.mutation({
			query: ({ timeRecordId, body }) => ({
				url: `/time/update/${timeRecordId}`,
				method: 'PUT',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		deleteTime: builder.mutation({
			query: (timeRecordId) => ({
				url: `/time/delete/${timeRecordId}`,
				method: 'DELETE',
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		approveTimeRecords: builder.mutation({
			query: (body) => ({
				url: `/time/approve`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['TimeRecords'],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(projectsApi.util.invalidateTags(['TimeRecords']));
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useSwitchTimerMutation,
	useDeleteTimerMutation,
	useApproveTimeRecordsMutation,
	useRecordTimerMutation,
	useUpdateTimeMutation,
	useDeleteTimeMutation,
} = timeApi;
