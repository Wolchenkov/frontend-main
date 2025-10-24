import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { transformGetOurTeamsResponse } from './transformGetOurTeamsResponse';
import { transformGetClientTeamsResponse } from './transformGetClientTeamsResponse';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';

// Команды
export const teamsApi = createApi({
	reducerPath: 'teamsApi',
	tagTypes: ['Team', 'ClientTeam', 'TypeWork'],
	refetchOnFocus: true,
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
		getOurTeamsData: builder.query<ITeamsData[], void>({
			query: () => ({ url: '/teams?include=unitMaster,users.userSalariesLast,invitedUsers' }),
			transformResponse: transformGetOurTeamsResponse,
			providesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		getClientTeamsData: builder.query<ITeamsData[], void>({
			query: () => ({ url: '/clients?include=users,invitedUsers' }),
			transformResponse: transformGetClientTeamsResponse,
			providesTags: ['ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteUser: builder.mutation<any, any>({
			query: (body) => ({ url: `/users/${body}`, method: 'DELETE' }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteClient: builder.mutation<any, any>({
			query: (body) => ({ url: `/users/${body}`, method: 'DELETE' }),
			invalidatesTags: ['ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteTeam: builder.mutation<any, any>({
			query: (body) => ({ url: `/teams/${body}`, method: 'DELETE' }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteClientTeam: builder.mutation<any, any>({
			query: (body) => ({ url: `/clients/${body}`, method: 'DELETE' }),
			invalidatesTags: ['ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changeTeam: builder.mutation<any, any>({
			query: (body) => ({ url: '/teams/changeTeam', method: 'POST', body }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changeRole: builder.mutation<any, any>({
			query: (body) => ({ url: '/teams/changeRole', method: 'POST', body }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changeRate: builder.mutation<any, any>({
			query: (body) => ({ url: '/teams/changeRate', method: 'POST', body }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changePosition: builder.mutation<any, any>({
			query: (body) => ({ url: '/teams/changePosition', method: 'POST', body }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		createTeam: builder.mutation<any, any>({
			query: (body) => ({ url: '/teams', method: 'POST', body }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		createClientTeam: builder.mutation<any, any>({
			query: (body) => ({ url: '/clients', method: 'POST', body }),
			invalidatesTags: ['ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changeTeamName: builder.mutation<any, any>({
			query: (body) => ({ url: `/teams/${body.teamId}`, method: 'PUT', body: { name: body.name } }),
			invalidatesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changeTeamTypesWork: builder.mutation<any, any>({
			query: (body) => ({ url: `/teams/${body.teamId}`, method: 'PUT', body: { type_work: body.typeWork } }),
			invalidatesTags: ['TypeWork'],
			transformErrorResponse: checkAuthInResponse,
		}),
		changeClientTeamName: builder.mutation<any, any>({
			query: (body) => ({ url: `/clients/${body.teamId}`, method: 'PUT', body: { name: body.name } }),
			invalidatesTags: ['ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		deleteInvite: builder.mutation<any, any>({
			query: (body) => ({ url: `/remove-tenant-invite`, method: 'POST', body: { email: body.email } }),
			invalidatesTags: ['Team', 'ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		resendInvite: builder.mutation<any, any>({
			query: (body) => ({ url: `/resend-tenant-invite`, method: 'POST', body: { email: body.email } }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getCurrentTypeWork: builder.query<fetchingTypeWork[], number>({
			query: (teamId) => ({ url: `/dictionary/teams/${teamId}/typeWork` }),
			providesTags: ['TypeWork'],
			transformErrorResponse: checkAuthInResponse,
		}),
		invite: builder.mutation<any, any>({
			query: (body) => ({ url: '/tenant-invite', method: 'POST', body }),
			invalidatesTags: ['Team', 'ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
		checkInvite: builder.mutation<any, any>({
			query: (body) => ({ url: '/check-tenant-invite', method: 'POST', body }),
			transformErrorResponse: checkAuthInResponse,
		}),
		getOurTeams: builder.query<fetchingDictionary[], void>({
			query: () => ({ url: '/dictionary/teams' }),
			providesTags: ['Team'],
			transformErrorResponse: checkAuthInResponse,
		}),
		getClientTeams: builder.query<fetchingDictionary[], void>({
			query: () => ({ url: '/dictionary/teams?client-teams' }),
			providesTags: ['ClientTeam'],
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useGetOurTeamsDataQuery,
	useGetClientTeamsDataQuery,
	useChangeTeamMutation,
	useChangePositionMutation,
	useDeleteUserMutation,
	useChangeRoleMutation,
	useChangeRateMutation,
	useChangeTeamNameMutation,
	useChangeTeamTypesWorkMutation,
	useCreateTeamMutation,
	useDeleteTeamMutation,
	useChangeClientTeamNameMutation,
	useCreateClientTeamMutation,
	useDeleteClientTeamMutation,
	useDeleteClientMutation,
	useGetCurrentTypeWorkQuery,
	useDeleteInviteMutation,
	useInviteMutation,
	useCheckInviteMutation,
	useResendInviteMutation,
	useGetClientTeamsQuery,
	useGetOurTeamsQuery,
	useLazyGetOurTeamsQuery,
} = teamsApi;
