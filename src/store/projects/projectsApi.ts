import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { groupsApi } from '../groups/groupsApi';
import { checkAuthInResponse } from '../../shared/utility/Utils/checkAuthInResponses';
import { dictionaryApi } from '../dictionaries/dictionariesApi';
import { templatesApi } from '../templates/templatesApi';
import { myWorkApi } from '../myWork/myWorkApi';

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_HTTP_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const localToken = localStorage.getItem('token');
			headers.set('Authorization', `Bearer ${localToken}`);
			return headers;
		},
	}),
	tagTypes: ['Projects', 'Project', 'ProjectIssue', 'TimeRecords', 'Gantt'],
	endpoints: (builder) => ({
		getProject: builder.query<IOneProject, string>({
			query: (projectSlug) => ({ url: `/projects/${projectSlug}` }),
			providesTags: ['Project', 'ProjectIssue'],
			transformErrorResponse: checkAuthInResponse,
		}),

		createProject: builder.mutation({
			query: (body) => ({ url: '/projects', method: 'POST', body }),
			invalidatesTags: ['Projects'],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(groupsApi.util.invalidateTags(['Groups']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		checkProjectSlug: builder.mutation({
			query: (body) => ({
				url: '/projects',
				method: 'POST',
				headers: {
					Precognition: 'true',
				},
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),

		deleteProject: builder.mutation<string, any>({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}`,
				method: 'DELETE',
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(groupsApi.util.invalidateTags(['Groups']));
					dispatch(templatesApi.util.invalidateTags(['Templates']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		getProjectIssues: builder.query<ITask[], string>({
			query: (projectSlug) => ({ url: `/projects/${projectSlug}/projectIssue` }),
			providesTags: ['ProjectIssue'],
			transformErrorResponse: checkAuthInResponse,
		}),

		getProjectFinishedIssues: builder.query<ITask[], string>({
			query: (projectSlug) => ({ url: `/projects/${projectSlug}/projectIssue/finished?limit=100` }),
			providesTags: ['ProjectIssue'],
			transformErrorResponse: checkAuthInResponse,
		}),

		getAllProjectFinishedIssues: builder.query<ITask[], string>({
			query: (projectSlug) => ({ url: `/projects/${projectSlug}/projectIssue/finished` }),
			providesTags: ['ProjectIssue'],
			transformErrorResponse: checkAuthInResponse,
		}),

		getKanbanProjectFinishedIssues: builder.query<ITask[], number>({
			query: (kanban) => ({ url: `/projects/kanban/${kanban}` }),
			providesTags: ['ProjectIssue'],
			transformErrorResponse: checkAuthInResponse,
		}),

		getGanttChart: builder.query<IGanttItem[], string>({
			query: (projectSlug) => ({ url: `/projects/${projectSlug}/gant` }),
			providesTags: ['Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		getTimeRecords: builder.query<{ data: ITimeRecord[]; links: []; meta: [] }, string>({
			query: (projectSlug) => ({ url: `/projects/${projectSlug}/getTimeRecords` }),
			providesTags: ['TimeRecords'],
			transformErrorResponse: checkAuthInResponse,
		}),

		addNewStage: builder.mutation<
			{ id: number; name: string },
			{
				name: string;
				project_slug: string | string[] | undefined;
			}
		>({
			query: (body) => ({ url: `/projects/kanban`, method: 'POST', body }),
			invalidatesTags: ['Project', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		dragStep: builder.mutation<any, any>({
			query: ({ projectSlug, body }) => ({
				url: `/projects/${projectSlug}/sortIssueKanban`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Project', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		dragIssue: builder.mutation<any, any>({
			query: ({ projectSlug, body }) => ({ url: `/projects/${projectSlug}/sortIssue`, method: 'POST', body }),
			invalidatesTags: ['Project', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		dragIssueEmptyColumn: builder.mutation<any, any>({
			query: ({ projectSlug, projectIssueId, body }) => ({
				url: `/projects/${projectSlug}/projectIssue/${projectIssueId}/changeKanban`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Project', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		completeIssue: builder.mutation<any, any>({
			query: ({ projectSlug, projectIssueId }) => ({
				url: `/projects/${projectSlug}/projectIssue/${projectIssueId}/completed`,
				method: 'POST',
			}),
			invalidatesTags: ['Project', 'ProjectIssue', 'Gantt'],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		updateIssue: builder.mutation<any, any>({
			query: ({ projectSlug, projectIssueId, body }) => ({
				url: `/projects/${projectSlug}/projectIssue/${projectIssueId}`,
				method: 'PUT',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(myWorkApi.util.invalidateTags(['MyWork']));
				} catch (err) {
					return;
				}
			},
			invalidatesTags: ['Project', 'ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		duplicateProjectIssue: builder.mutation({
			query: ({ project, projectIssue }: { project: string; projectIssue: number }) => ({
				url: `/projects/${project}/projectIssue/${projectIssue}/duplicate`,
				method: 'POST',
			}),
			invalidatesTags: ['ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		changePriorityProjectIssue: builder.mutation({
			query: ({
				project,
				projectIssue,
				body,
			}: {
				project: string;
				projectIssue: number;
				body: { project_issue_priority_id: number };
			}) => ({
				url: `/projects/${project}/projectIssue/${projectIssue}/changePriority`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['ProjectIssue'],
			transformErrorResponse: checkAuthInResponse,
		}),

		updateProjectIssue: builder.mutation({
			query: ({ project, projectIssue, body }: { project: string; projectIssue: number; body: object }) => ({
				url: `/projects/${project}/projectIssue/${projectIssue}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		deleteProjectIssue: builder.mutation({
			query: ({ project, projectIssue }: { project: string; projectIssue: number }) => ({
				url: `/projects/${project}/projectIssue/${projectIssue}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		renameKanban: builder.mutation({
			query: ({ kanban, body }: { kanban: number; body: { name: string; project_slug: string } }) => ({
				url: `/projects/kanban/${kanban}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		deleteKanban: builder.mutation({
			query: (kanban: number) => ({
				url: `/projects/kanban/${kanban}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		updateProject: builder.mutation({
			query: ({ projectSlug, body }) => ({
				url: `/projects/${projectSlug}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Project'],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(groupsApi.util.invalidateTags(['Groups']));
					dispatch(dictionaryApi.util.invalidateTags(['CurrentProjectTypeWork']));
					dispatch(templatesApi.util.invalidateTags(['Templates']));
				} catch (err) {
					return;
				}
			},
			transformErrorResponse: checkAuthInResponse,
		}),

		updateProjectView: builder.mutation({
			query: ({ projectSlug, body }) => ({
				url: `/user/saveProjectView/${projectSlug}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Project'],
			transformErrorResponse: checkAuthInResponse,
		}),

		linkGanttTasks: builder.mutation({
			query: ({ projectSlug, kanban, body }) => ({
				url: `/projects/${projectSlug}/gant/${kanban}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		updateMembersInProject: builder.mutation({
			query: ({ projectSlug, body }) => ({
				url: `/projects/${projectSlug}/changeMembers`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Project'],
			transformErrorResponse: checkAuthInResponse,
		}),

		inviteInProject: builder.mutation<any, any>({
			query: (body) => ({ url: '/tenant-invite', method: 'POST', body }),
			invalidatesTags: ['Project'],
			transformErrorResponse: checkAuthInResponse,
		}),

		deleteInvite: builder.mutation<any, any>({
			query: (body) => ({ url: `/remove-tenant-invite`, method: 'POST', body: { email: body.email } }),
			invalidatesTags: ['Project'],
			transformErrorResponse: checkAuthInResponse,
		}),

		resendInvite: builder.mutation({
			query: (body) => ({ url: `/resend-tenant-invite`, method: 'POST', body: { email: body.email } }),
			transformErrorResponse: checkAuthInResponse,
		}),

		createIssue: builder.mutation({
			query: (payload) => ({
				url: `/projects/${payload.projectSlug}/projectIssue`,
				method: 'POST',
				body: payload.body,
			}),
			invalidatesTags: ['Project', 'ProjectIssue', 'Gantt'],
			transformErrorResponse: checkAuthInResponse,
		}),

		commentTime: builder.mutation({
			query: ({ projectSlug, timeRecordId, body }) => ({
				url: `/projects/${projectSlug}/commentTime/${timeRecordId}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['TimeRecords'],
			transformErrorResponse: checkAuthInResponse,
		}),

		addCommentInTask: builder.mutation({
			query: ({ projectSlug, body, issueId }) => ({
				url: `/projects/${projectSlug}/projectIssue/${issueId}/comment`,
				method: 'POST',
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),

		deleteComment: builder.mutation({
			query: ({ projectSlug, issueId, commentId }) => ({
				url: `/projects/${projectSlug}/projectIssue/${issueId}/comment/${commentId}`,
				method: 'DELETE',
			}),
			transformErrorResponse: checkAuthInResponse,
		}),

		updateCommentInTask: builder.mutation({
			query: ({ projectSlug, body, issueId, commentId }) => ({
				url: `/projects/${projectSlug}/projectIssue/${issueId}/comment/${commentId}`,
				method: 'PUT',
				body,
			}),
			transformErrorResponse: checkAuthInResponse,
		}),
	}),
});

export const {
	useCreateProjectMutation,
	useCheckProjectSlugMutation,
	useGetProjectQuery,
	useLazyGetProjectQuery,
	useGetProjectIssuesQuery,
	useLazyGetProjectIssuesQuery,
	useGetProjectFinishedIssuesQuery,
	useLazyGetAllProjectFinishedIssuesQuery,
	useLazyGetKanbanProjectFinishedIssuesQuery,
	useGetGanttChartQuery,
	useGetTimeRecordsQuery,
	useDragStepMutation,
	useDragIssueMutation,
	useDragIssueEmptyColumnMutation,
	useAddNewStageMutation,
	useDuplicateProjectIssueMutation,
	useChangePriorityProjectIssueMutation,
	useUpdateProjectIssueMutation,
	useDeleteProjectIssueMutation,
	useRenameKanbanMutation,
	useDeleteKanbanMutation,
	useCompleteIssueMutation,
	useUpdateIssueMutation,
	useDeleteProjectMutation,
	useUpdateProjectMutation,
	useUpdateProjectViewMutation,
	useLinkGanttTasksMutation,
	useInviteInProjectMutation,
	useUpdateMembersInProjectMutation,
	useDeleteInviteMutation,
	useResendInviteMutation,
	useCommentTimeMutation,
	useCreateIssueMutation,
	useAddCommentInTaskMutation,
	useUpdateCommentInTaskMutation,
	useDeleteCommentMutation,
} = projectsApi;
