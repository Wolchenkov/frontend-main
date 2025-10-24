import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const groupsApi = createApi({
	reducerPath: 'groupsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['Groups'],
	endpoints: (builder) => ({
		getGroups: builder.query<any, void>({
			query: () => ({ url: '/groups' }),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['Groups'],
		}),
		getGroupProjects: builder.query<any, string>({
			query: (id: string) => ({ url: `/groups/${id}` }),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['Groups'],
		}),
		createGroup: builder.mutation({
			query: (body) => ({
				url: '/groups',
				method: 'POST',
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
			invalidatesTags: ['Groups'],
		}),
		movementProjectFromGroup: builder.mutation({
			query: ({ id, body }) => ({
				url: `/groups/${id}`,
				method: 'PUT',
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
			invalidatesTags: ['Groups'],
		}),
		deleteGroup: builder.mutation({
			query: (id: string | string[]) => ({
				url: `/groups/${id}`,
				method: 'DELETE',
			}),
			transformErrorResponse: checkAuthInResponse,
			invalidatesTags: ['Groups'],
		}),
		renameGroup: builder.mutation({
			query: ({ slug, body }) => ({
				url: `/groups/${slug}`,
				method: 'PUT',
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
			invalidatesTags: ['Groups'],
		}),
	}),
});

export const {
	useGetGroupsQuery,
	useGetGroupProjectsQuery,
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useRenameGroupMutation,
	useMovementProjectFromGroupMutation,
} = groupsApi;
