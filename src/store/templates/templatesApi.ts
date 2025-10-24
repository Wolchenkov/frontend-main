import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const templatesApi = createApi({
	reducerPath: 'templatesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['Templates'],
	endpoints: (builder) => ({
		getTemplates: builder.query<ITemplateGroup[], void>({
			query: () => ({ url: '/template' }),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['Templates'],
		}),

		createTemplate: builder.mutation({
			query: ({ projectSlug, body }: { projectSlug: string; body: { name: string } }) => ({
				url: `/projects/${projectSlug}/template`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Templates'],
			transformErrorResponse: checkAuthInResponse,
		}),

		applyTemplate: builder.mutation({
			query: ({ projectSlug, templateSlug }: { projectSlug: string; templateSlug: string }) => ({
				url: `/projects/${projectSlug}/template/${templateSlug}`,
				method: 'POST',
			}),
			invalidatesTags: ['Templates'],
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const { useGetTemplatesQuery, useCreateTemplateMutation, useApplyTemplateMutation } = templatesApi;
