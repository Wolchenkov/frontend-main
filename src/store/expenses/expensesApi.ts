import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const expensesApi = createApi({
	reducerPath: 'expensesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['expenses'],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getExpenses: builder.query<any, any>({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}/expenses`,
			}),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['expenses'],
		}),
		addExpense: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}/expenses`,
				method: 'POST',
				body: payload.body,
			}),
			invalidatesTags: ['expenses'],
		}),
		updateExpense: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}/expenses/${payload.id}`,
				method: 'PUT',
				body: payload.body,
			}),
			invalidatesTags: ['expenses'],
		}),
		deleteExpense: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}/expenses/${payload.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['expenses'],
		}),
	}),
});

export const { useGetExpensesQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } =
	expensesApi;
