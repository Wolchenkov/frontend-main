import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const docsApi = createApi({
	reducerPath: 'docsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['Docs'],
	endpoints: (builder) => ({
		getDocs: builder.query<IDocument[], { type: string; slug: string; folderId?: number }>({
			query: ({ type, slug, folderId }) => ({ url: `/${type}/${slug}/docs${folderId ? '/' + folderId : ''}` }),
			providesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
		getDocsStructure: builder.query<IDocsStructure[], { type: string; slug: string }>({
			query: ({ type, slug }) => ({
				url: `/${type}/${slug}/docs/structure`,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),
		getNote: builder.query({
			query: ({ type, slug, noteId }) => ({ url: `/${type}/${slug}/notes/${noteId}` }),
			transformErrorResponse: checkAuthInResponse,
		}),

		createDoc: builder.mutation({
			query: ({ type, slug, body }) => ({
				url: `/${type}/${slug}/docs`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
		moveDoc: builder.mutation({
			query: ({ type, slug, body }) => ({
				url: `/${type}/${slug}/docs/move`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
		updateDoc: builder.mutation({
			query: ({ type, slug, docId, body }) => ({
				url: `/${type}/${slug}/docs/${docId}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteDoc: builder.mutation({
			query: ({ type, slug, docId }) => ({
				url: `/${type}/${slug}/docs/${docId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
		duplicateDoc: builder.mutation({
			query: ({ type, slug, body }) => ({
				url: `/${type}/${slug}/docs/duplicate`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
		linkFileToNote: builder.mutation({
			query: ({ type, slug, noteId, body }) => ({
				url: `/${type}/${slug}/notes/${noteId}/upload`,
				method: 'POST',
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),
		saveNote: builder.mutation({
			query: ({ type, slug, noteId, body }) => ({
				url: `/${type}/${slug}/notes/${noteId}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Docs'],
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useLazyGetDocsQuery,
	useCreateDocMutation,
	useLazyGetDocsStructureQuery,
	useMoveDocMutation,
	useUpdateDocMutation,
	useDeleteDocMutation,
	useDuplicateDocMutation,
	useLinkFileToNoteMutation,
	useSaveNoteMutation,
	useLazyGetNoteQuery,
} = docsApi;
