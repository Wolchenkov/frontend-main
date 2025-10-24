import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';
import { setUploadProgress, addUploadToList } from './uploadsSlice';

export const uploadsApi = createApi({
	reducerPath: 'uploadsApi',
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
		fileUpload: builder.mutation<IFileUpload, File>({
			query: (file) => {
				const body = new FormData();
				body.append('file', file, file.name);

				return {
					url: `/file/uploads`,
					method: 'POST',
					body,
				};
			},
			transformErrorResponse: checkAuthInResponse,
		}),
		fileUploadWithProgress: builder.mutation({
			queryFn: ({ id, file }, api) => {
				return new Promise((res, rej) => {
					api.dispatch(addUploadToList({ id, name: file.name }));

					const localToken = localStorage.getItem('token');
					const body = new FormData();
					body.append('file', file, file.name);

					const xhr = new XMLHttpRequest();
					xhr.upload.onprogress = (e) => {
						const loadedPercent = Math.round((100 * e.loaded) / e.total);
						api.dispatch(setUploadProgress({ id, loaded: loadedPercent }));
					};
					xhr.open('POST', `${process.env.NEXT_PUBLIC_HTTP_SERVICE_URL}/file/uploads`);
					xhr.setRequestHeader('Accept', 'application/json');
					xhr.setRequestHeader('Authorization', `Bearer ${localToken}`);

					xhr.onload = () => {
						if (xhr.status >= 200 && xhr.status < 300) {
							res({ data: xhr.response });
						} else {
							rej({ error: xhr.statusText });
						}
					};
					xhr.onerror = () => {
						rej({ error: xhr.statusText });
					};

					xhr.send(body);
				});
			},
		}),
	}),
});

export const { useFileUploadMutation, useFileUploadWithProgressMutation } = uploadsApi;
