import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['Tasks'],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getTask: builder.query<ITaskDetail, any>({
			query: ({ project, projectIssue }) => ({ url: `/projects/${project}/projectIssue/${projectIssue}` }),
			providesTags: ['Tasks'],
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const { useGetTaskQuery } = tasksApi;
