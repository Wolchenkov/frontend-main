import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const myWorkApi = createApi({
	reducerPath: 'myWorkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	refetchOnMountOrArgChange: true,
	tagTypes: ['MyWork', 'MyReadiness'],
	endpoints: (builder) => ({
		getMyTasks: builder.query<IMyWorkTask[], void>({
			query: () => ({ url: '/myWork/projectIssues' }),
			providesTags: ['MyWork'],
			transformErrorResponse: checkAuthInResponse,
		}),
		getMySchedule: builder.query<any, any>({
			query: (payload) => ({
				url: `/myWork/schedule?date_start=${payload.from}`,
			}),
			providesTags: ['MyWork'],
			transformErrorResponse: checkAuthInResponse,
		}),
		getMyReadiness: builder.query<IMyWorkReadiness, void>({
			query: () => ({ url: '/myWork' }),
			providesTags: ['MyReadiness'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteMyReadinessItem: builder.mutation<any, any>({
			query: (itemId) => ({ url: `/myWork/${itemId}`, method: 'DELETE' }),
			invalidatesTags: ['MyReadiness'],
			transformErrorResponse: checkAuthInResponse,
		}),
		getMyApproval: builder.query<IMyWorkApproval, void>({
			query: () => ({ url: '/myWork/agreement' }),
			providesTags: ['MyReadiness'],
			transformErrorResponse: checkAuthInResponse,
		}),
		createApplication: builder.mutation<any, any>({
			query: (body) => ({ url: '/myWork', method: 'POST', body }),
			invalidatesTags: ['MyReadiness'],
			transformErrorResponse: checkAuthInResponse,
		}),
		processApplication: builder.mutation<any, any>({
			query: ({ itemId, body }) => ({ url: `/myWork/agreement/${itemId}`, method: 'PUT', body }),
			invalidatesTags: ['MyReadiness'],
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useGetMyTasksQuery,
	useGetMyScheduleQuery,
	useGetMyReadinessQuery,
	useDeleteMyReadinessItemMutation,
	useGetMyApprovalQuery,
	useCreateApplicationMutation,
	useProcessApplicationMutation,
} = myWorkApi;
