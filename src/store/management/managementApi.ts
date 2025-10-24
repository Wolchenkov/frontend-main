import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const managementApi = createApi({
	reducerPath: 'managementApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['General', 'Post', 'WorkType', 'WeekDays'],
	endpoints: (builder) => ({
		// Общие настройки
		getGeneral: builder.query<any, void>({
			query: () => ({ url: '/administration/general' }),
			providesTags: ['General'],
			transformErrorResponse: checkAuthInResponse,
		}),
		setGeneral: builder.mutation<any, string>({
			query: (key) => ({ url: `/administration/general/${key}`, method: 'POST' }),
			invalidatesTags: ['General'],
			transformErrorResponse: checkAuthInResponse,
		}),

		// Должности
		getPosts: builder.query<IManagementPost[], void>({
			query: () => ({ url: '/administration/positions' }),
			providesTags: ['Post'],
			transformErrorResponse: checkAuthInResponse,
		}),
		addPost: builder.mutation<any, any>({
			query: (body) => ({ url: `/administration/positions`, method: 'POST', body }),
			invalidatesTags: ['Post'],
			transformErrorResponse: checkAuthInResponse,
		}),
		renamePost: builder.mutation<any, any>({
			query: ({ postId, body }) => ({ url: `/administration/positions/${postId}`, method: 'PUT', body }),
			invalidatesTags: ['Post'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deletePost: builder.mutation<any, number>({
			query: (postId) => ({ url: `/administration/positions/${postId}`, method: 'DELETE' }),
			invalidatesTags: ['Post'],
			transformErrorResponse: checkAuthInResponse,
		}),

		// Типы работ
		getWorkTypes: builder.query<IManagementWorkType[], void>({
			query: () => ({ url: '/administration/typeWork' }),
			providesTags: ['WorkType'],
			transformErrorResponse: checkAuthInResponse,
		}),
		addWorkType: builder.mutation<any, any>({
			query: (body) => ({ url: `/administration/typeWork`, method: 'POST', body }),
			invalidatesTags: ['WorkType'],
			transformErrorResponse: checkAuthInResponse,
		}),
		updateWorkType: builder.mutation<any, any>({
			query: ({ typeWorkId, body }) => ({ url: `/administration/typeWork/${typeWorkId}`, method: 'PUT', body }),
			invalidatesTags: ['WorkType'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteWorkType: builder.mutation<any, number>({
			query: (typeWorkId) => ({ url: `/administration/typeWork/${typeWorkId}`, method: 'DELETE' }),
			invalidatesTags: ['WorkType'],
			transformErrorResponse: checkAuthInResponse,
		}),

		// Часовой пояс
		setTimeZone: builder.mutation<any, any>({
			query: (body) => ({ url: `/administration/timezone`, method: 'POST', body }),
			invalidatesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),

		// Стандартные рабочие дни
		getWeekDays: builder.query<IManagementWeekDays, void>({
			query: () => ({ url: '/administration/workDay' }),
			providesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),
		updateWeekDays: builder.mutation<any, any>({
			query: (body) => ({ url: '/administration/workDay', method: 'POST', body }),
			invalidatesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),

		// Нерабочие дни
		addHoliday: builder.mutation<any, any>({
			query: (body) => ({ url: '/administration/NoWorkDay', method: 'POST', body }),
			invalidatesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteHoliday: builder.mutation<any, any>({
			query: (body) => ({ url: '/administration/NoWorkDay', method: 'DELETE', body }),
			invalidatesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),

		// Дополнительные рабочие дни
		addExtraWeekDay: builder.mutation<any, any>({
			query: (body) => ({ url: '/administration/ExtraDays', method: 'POST', body }),
			invalidatesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteExtraWeekDay: builder.mutation<any, any>({
			query: (body) => ({ url: '/administration/ExtraDays', method: 'DELETE', body }),
			invalidatesTags: ['WeekDays'],
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useGetGeneralQuery,
	useSetGeneralMutation,
	useGetPostsQuery,
	useAddPostMutation,
	useRenamePostMutation,
	useDeletePostMutation,
	useGetWorkTypesQuery,
	useAddWorkTypeMutation,
	useUpdateWorkTypeMutation,
	useDeleteWorkTypeMutation,
	useGetWeekDaysQuery,
	useUpdateWeekDaysMutation,
	useAddHolidayMutation,
	useDeleteHolidayMutation,
	useAddExtraWeekDayMutation,
	useDeleteExtraWeekDayMutation,
	useSetTimeZoneMutation,
} = managementApi;
