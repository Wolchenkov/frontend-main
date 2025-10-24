import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';
import { groupsApi } from '../groups/groupsApi';

export const trashApi = createApi({
	reducerPath: 'trashApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['Trash'],
	endpoints: (builder) => ({
		getTrash: builder.query<ITrash, void>({
			query: () => ({ url: '/basket' }),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['Trash'],
		}),

		recoverTrashItem: builder.mutation({
			query: ({ itemName, itemId }: { itemName: string; itemId: number }) => ({
				url: `/basket/${itemName}/${itemId}`,
				method: 'POST',
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(groupsApi.util.invalidateTags(['Groups']));
				} catch (err) {
					return;
				}
			},
			invalidatesTags: ['Trash'],
		}),

		deleteTrashItem: builder.mutation({
			query: ({ itemName, itemId }: { itemName: string; itemId: number }) => ({
				url: `/basket/${itemName}/${itemId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Trash'],
		}),

		deleteAllTrash: builder.mutation<any, void>({
			query: () => ({
				url: '/basket',
				method: 'DELETE',
			}),
			invalidatesTags: ['Trash'],
		}),
	}),
});

export const { useGetTrashQuery, useRecoverTrashItemMutation, useDeleteTrashItemMutation, useDeleteAllTrashMutation } =
	trashApi;
