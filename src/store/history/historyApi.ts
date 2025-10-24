import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const historyApi = createApi({
	reducerPath: 'historyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['history'],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getHistory: builder.query<IHistory, any>({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}/history${
					payload.historyInterval ? `?from=${payload.historyInterval.from}&to=${payload.historyInterval.to}` : ''
				}`,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),
		getMoreHistory: builder.query<IHistory, any>({
			query: (payload) => ({ url: payload }),
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const { useGetHistoryQuery, useLazyGetMoreHistoryQuery } = historyApi;
