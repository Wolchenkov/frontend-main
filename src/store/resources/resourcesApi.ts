import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const resourcesApi = createApi({
	reducerPath: 'resourcesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getResourcePlanning: builder.query<any, any>({
			query: ({ team }) => ({ url: `/resourcePlanning/${team}` }),
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const { useLazyGetResourcePlanningQuery } = resourcesApi;
