import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';
import { projectsApi } from '../projects/projectsApi';

export const importApi = createApi({
	reducerPath: 'importApi',
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
	endpoints: (builder) => ({
		import: builder.mutation<any, any>({
			query: ({ projectSlug, file }) => {
				const body = new FormData();
				body.append('file', file, file.name);
				return {
					method: 'POST',
					url: `/projects/${projectSlug}/import`,
					body,
				};
			},
			transformErrorResponse: checkAuthInResponse,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(projectsApi.util.invalidateTags(['Project', 'ProjectIssue']));
				} catch (err) {
					return;
				}
			},
		}),
	}),
});

export const { useImportMutation } = importApi;
