import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

export const reportsApi = createApi({
	reducerPath: 'reportsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['reports'],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getSchedule: builder.query<ISchedule, any>({
			query: ({ reportsInterval, id }) => {
				const queryParams = [];
				reportsInterval && queryParams.push(`date_start=${reportsInterval.from}`);
				id && queryParams.push(`team_id=${id}`);
				const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
				return {
					url: `/report/schedule${queryString}`,
				};
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		getMoreSchedule: builder.query<ISchedule, any>({
			query: (payload) => ({ url: payload }),
			transformErrorResponse: checkAuthInResponse,
		}),

		getProjects: builder.query<IProjectReport, any>({
			query: ({ reportsInterval, id }) => {
				const queryParams = [];
				if (reportsInterval) {
					queryParams.push(`date_start=${reportsInterval.from}`);
					queryParams.push(`date_end=${reportsInterval.to}`);
				}
				id && queryParams.push(`team_id=${id}`);
				const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
				return {
					url: `/report/project${queryString}`,
				};
			},
			transformErrorResponse: checkAuthInResponse,
		}),
		getMoreProject: builder.query<IProjectReport, any>({
			query: (payload) => ({ url: payload }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getClients: builder.query<IClientReport, any>({
			query: ({ reportsInterval }) => ({
				url: `/report/clients${
					reportsInterval ? `?date_start=${reportsInterval.from}&date_end=${reportsInterval.to}` : ''
				}`,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),

		getMoreClients: builder.query<IClientReport, any>({
			query: (payload) => ({ url: payload }),
			transformErrorResponse: checkAuthInResponse,
		}),

		getMembers: builder.query<IMemberReport, any>({
			query: ({ reportsInterval, id }) => {
				const queryParams = [];
				if (reportsInterval) {
					queryParams.push(`date_start=${reportsInterval.from}`);
					queryParams.push(`date_end=${reportsInterval.to}`);
				}
				id && queryParams.push(`team_id=${id}`);
				const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
				return {
					url: `/report/executor${queryString}`,
				};
			},
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useGetScheduleQuery,
	useGetProjectsQuery,
	useGetClientsQuery,
	useGetMembersQuery,
	useLazyGetMoreProjectQuery,
	useLazyGetMoreScheduleQuery,
	useLazyGetMoreClientsQuery,
} = reportsApi;
