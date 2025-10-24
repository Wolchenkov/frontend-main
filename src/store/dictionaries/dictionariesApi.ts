import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

// Команды
export const dictionaryApi = createApi({
	reducerPath: 'dictionaryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['CurrentProjectTypeWork'],
	endpoints: (builder) => ({
		getRoles: builder.query<fetchingDictionary[], void>({
			query: () => ({ url: '/dictionary/roles' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getPositions: builder.query<fetchingDictionary[], void>({
			query: () => ({ url: '/dictionary/positions' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getProjectStatuses: builder.query<fetchingDictionaryStatus[], void>({
			query: () => ({ url: '/dictionary/projects/status' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getProjectManagers: builder.query<IMember[], void>({
			query: () => ({ url: '/dictionary/projects/manager' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getProjectMembers: builder.query<IMember[], void>({
			query: () => ({ url: '/dictionary/projects/members' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getProjectClientMembers: builder.query<IMember[], void>({
			query: () => ({ url: '/dictionary/projects/clientsMembers' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getProjectClients: builder.query<fetchingDictionaryClient[], void>({
			query: () => ({ url: '/dictionary/projects/clients' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getProjectTypeWork: builder.query<fetchingDictionaryTypeWork[], void>({
			query: () => ({ url: '/dictionary/projects/typeWork' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getTypeWork: builder.query<fetchingTypeWork[], void>({
			query: () => ({ url: '/dictionary/teams/typeWork' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getIssuePriorities: builder.query<fetchingDictionaryPriority[], void>({
			query: () => ({ url: '/dictionary/issue/priority' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getCurrentProjectTypeWork: builder.query<fetchingDictionaryTypeWork[], string>({
			query: (projectSlug) => ({ url: `/dictionary/projects/typeWorkForUpdate/${projectSlug}` }),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['CurrentProjectTypeWork'],
		}),
		getCurrentIssueTypeWork: builder.query<fetchingDictionaryTypeWork[], string>({
			query: (issueId) => ({ url: `/dictionary/projects/projectTypeWork/${issueId}` }),
			transformErrorResponse: checkAuthInResponse,
			providesTags: ['CurrentProjectTypeWork'],
		}),
		getVacationTypes: builder.query<fetchingDictionaryVacation[], void>({
			query: () => ({ url: '/dictionary/my-work/typeVacation' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getRegions: builder.query<fetchingDictionaryRegion[], void>({
			query: () => ({ url: '/dictionary/administration/area' }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getTimeZones: builder.query<fetchingDictionaryTimeZone[], string>({
			query: (region) => ({ url: `/dictionary/administration/timezone/${region}` }),
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useGetRolesQuery,
	useGetPositionsQuery,
	useGetProjectStatusesQuery,
	useGetProjectManagersQuery,
	useGetProjectMembersQuery,
	useGetProjectClientsQuery,
	useGetProjectTypeWorkQuery,
	useGetTypeWorkQuery,
	useGetIssuePrioritiesQuery,
	useGetProjectClientMembersQuery,
	useGetCurrentProjectTypeWorkQuery,
	useGetVacationTypesQuery,
	useGetRegionsQuery,
	useLazyGetTimeZonesQuery,
	useGetCurrentIssueTypeWorkQuery,
} = dictionaryApi;
