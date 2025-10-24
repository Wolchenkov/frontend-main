declare module '@editorjs/image';
declare module '@editorjs/attaches';
declare module '@editorjs/link';
declare module '@editorjs/list';
declare module '@editorjs/delimiter';
declare module '@editorjs/table';
declare module '@editorjs/underline';
declare module '@groupher/editor-mention';

interface IUser {
	id: number;
	name: string;
	role: string;
	email: string;
	hourlyRate: number | string;
	position: string;
}

interface fetchingDictionary {
	id: number;
	value: string;
}

interface fetchingDictionaryStatus {
	status: string;
	svg: string;
	sort: number;
}

interface ITimerInUser {
	elapsed: number;
	isRunning: boolean;
	project_issue_id: number;
	project_issue_name: string;
	project_budget: string;
}

interface IMember {
	[key: string]: any;
	avatar: string | null;
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	name: string;
	permissions: string[];
	timers: ITimerInUser[];
	role?: {
		name: string;
		label: string;
	};
	team: string;
	teamId: number;
	telegram: string | null;
	lastTypeWork: string | null;
}
interface IMemberNotificationSettings {
	notifications: {
		enabled: boolean;
		group: string;
		id: number;
		name: string;
		user_id: number;
	}[];
	notificationSettings: {
		enabled: boolean;
		group: string;
		id: number;
		name: string;
		user_id: number;
	}[];
}

interface fetchingDictionaryClient {
	id: number;
	value: string;
}

interface fetchingDictionaryTypeWork {
	id: number;
	parent_id: number;
	type: string;
	cost: number;
	sort: number;
}

interface fetchingTypeWork {
	id: number;
	parent_id: number | null;
	type: string;
	cost: number;
	sort: number;
}

interface ITeamsWithLabels {
	label: string;
	id: number;
	value: string;
}

interface UserForTeam {
	id: number;
	type: string;
	attributes?: {
		avatar?: string | null;
		email: string;
		name: string;
		rate?: string;
		role?: string;
		position?: number;
	};
}
interface InvitedUser {
	id: number;
	type: string;
	attributes?: {
		email: string;
		name: string;
	};
}

interface IncludedUsers {
	attributes:
		| {
				avatar: string | null;
				email: string;
				name: string;
				role: string;
		  }
		| { created_at: string; efficiency: string; rate: string; updated_at: string; user_id: number; valid_from: string };
	id: number;
	type: string;
}
interface ITeamsData {
	id: number;
	attributes: {
		name: string;
		unit_master_id: number;
		isRateVisible: boolean;
	};
	relationships: {
		unit_master: { data: { id: number; type: string } };
		users: { data: UserForTeam[] };
		invitedUsers: { data: InvitedUser[] };
	};
}
interface fetchingTeamsData {
	data: ITeamsData[];
	included: IncludedUsers[];
}

interface IRate {
	id: number;
	cost: number;
}

interface IBudgetFixed {
	type: 'fixed';
	amount: number;
	type_work: IRate[];
}

interface IBudgetTimeMaterial {
	type: 'Time&Material';
	type_work: IRate[];
}

interface IBudgetNotBillable {
	type: 'not_billable';
}

type IBudget = IBudgetFixed | IBudgetTimeMaterial | IBudgetNotBillable | Record<string, never>;

interface IProject {
	budget: string;
	balance: string;
	id: number;
	name: string;
	start: string;
	end: string | null;
	client: fetchingDictionaryClient | null;
	manager: IMember;
	team: IMember[];
	completion: number;
	status: fetchingDictionaryStatus;
}

interface INewProjectState {
	name: string;
	slug: string;
	date_start: string;
	date_end: string | null;
	budget: IBudget;
	members: number[];
	manager_id: number;
	project_status_id: number;
	client_id: number;
	group_id: number;
	user?: IMember;
}
interface INewTaskState {
	name: string;
	project_issue_kanban_id: number;
	project_issue_priority_id: number;
	description?: string;
	hide_from_client?: boolean;
	data_start?: string | null;
	deadline?: string | null;
	delegate_id: number;
	subscribers?: number[];
	estimate?: number | null;
	type_work_id?: number | null;
	parent_id?: number;
}

interface ITask {
	id: number;
	focus: boolean | null;
	name: string;
	description: string;
	hide_from_client: boolean;
	date_start: string;
	deadline: string | null;
	position: number;
	completed_on: string | null;
	estimate: number;
	time_amount: number;
	project_issue_kanban_id: number;
	delegate_id: number;
	budget: number;
	balance: number;
	parent_id: number;
	depth: number;
	delegate: {
		id: number;
		name: string;
		email: string;
		role: string;
		avatar: string | null;
	};
	priority: fetchingDictionaryPriority;
	children: number;
	project_type_budget: string;
	project_issue_priority_id?: number;
}

interface IKanban {
	id: number;
	sort: number;
	name: string;
	projectIssue: number[];
	projectIssueFinish: ITask[];
	projectIssueFinishCount: number;
}
interface IOneProject {
	id: number;
	name: string;
	slug: string;
	view_mode: string;
	completion: number;
	date_start: string;
	date_end: string | null;
	budget_amount: number;
	budget_balance: number;
	budget_type: string;
	manager_id: number;
	project_status_id: number;
	client_id: number;
	group_id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	client: {
		id: number;
		name: string;
	};
	usersMember: IMember[];
	clientMembers: IMember[];
	invitedUsers: {
		members: InvitedUsersInProject[];
		clients: InvitedUsersInProject[];
	};
	Kanban: IKanban[];
}
interface InvitedUsersInProject {
	name: string;
	email: string;
}

interface IKanbanIssue {
	id: number;
	name: string;
	issues: ITask[];
	finishedIssues: {
		count: number;
		issues: ITask[];
	};
}

interface fetchingDictionaryPriority {
	id: number;
	priority: string;
	color: string;
	sort: number;
}

interface Project {
	id: number;
	name: string;
	slug: string;
}

interface Group {
	id: number;
	name: string;
	projects: Project[];
}
interface IMembersState {
	clients: IMember[];
	members: IMember[];
}

interface IFilter {
	status: number | null;
	delegate_id: number | null;
	priority: number | null;
	date_start: [string | null, string | null] | null;
}

interface IResponseSwitchTimer {
	elapsed: number;
	isRunning: boolean;
	project_issue_id: number;
	project_issue_name: string;
}

interface ITimeRecord {
	id: nummber;
	user: { id: number; name: string; avatar: string };
	project_issue_id: number;
	project_issue_name: string;
	project_issue_estimate: number;
	project_issue_time_amount: number;
	time_amount: number;
	record_date: string;
	is_billable: boolean;
	description: string;
	type_work_name: string;
	type_work_id: number;
	is_approved: boolean;
	is_changed: boolean;
	has_comment: boolean;
}

// history
type ActionTypes =
	| 'Created_task'
	| 'Assigned_task'
	| 'Reassigned_the_task'
	| 'Moved_the_task_to'
	| 'Left_a_comment_on_the_task'
	| 'Added_priority_to_the_task'
	| 'Changed_the_priority_of_the_task'
	| 'Changed_the_start_date_of_the_task'
	| 'Completed_the_task'
	| 'Deleted_the_task'
	| 'Deleted_the_project'
	| 'Added_an_assessment_the_task'
	| 'Changed_the_task_time_forecast'
	| 'Added_a_clock_to_the_task'
	| 'Renamed_the_project'
	| 'Created_a_project';
interface User {
	id: number;
	name: string;
}

interface Issue {
	id: number;
	name: string;
}

interface Project {
	name: string;
	slug: string;
}

interface Text {
	user: User;
	issue: Issue;
	action: ActionTypes | 'Completed_the_project';
	project: Project;
	targetUser: User;
	kanban?: string;
}

interface HistoryDataItem {
	id: number;
	text: Text;
	project_id: number;
	created_at: string;
	date: string;
}

interface HistoryData {
	[key: string]: HistoryDataItem[];
}

interface IHistory {
	data: HistoryData;
	next: string | null;
	prev: string | null;
}

interface IHistoryInterval {
	from: string;
	to: string;
}

// expenses
interface IOneExpense {
	id: number;
	user: {
		id: number;
		name: string;
		avatar: string;
	};
	project_id: number;
	date: string;
	description: string;
	cost: number;
}

// task
interface IUserTimer {
	elapsed: number;
	isRunning: boolean;
	project_issue_id: number;
}

interface IComment {
	id: number;
	text: OutputData;
	created_at: string;
	author: {
		id: number;
		user: string;
		email: string;
		avatar: string | null;
	};
	files: IFileInTask[];
	mentions: number[];
	type: string;
}

interface IFileInTask {
	custom_properties: {
		custom_headers: {
			created_at: string;
			user_id: number;
			user_name: string;
		};
	};
	extension: string;
	file_name: string;
	name: string;
	order: number;
	original_url: string;
	preview_url: string;
	size: number;
	uuid: string;
}

interface ITaskDetail {
	attachment: IFileInTask[];
	id: number;
	balance: number;
	budget: number;
	children: ITaskInTask[];
	comments: IComment[];
	completed_on: string | null;
	created_at: string;
	created_id: number;
	date_start: string | null;
	deadline: string | null;
	delegate: IDelegateMember | null;
	delegate_id: number | null;
	description: OutputData;
	estimate: number | null;
	hide_from_client: boolean;
	name: string;
	created_name: string;
	parent: ITaskInTask | null;
	parent_id: number | null;
	position: number;
	priority: fetchingDictionaryPriority | null;
	project_issue_kanban_id: number;
	project_issue_priority_id: number;
	project_type_budget: string;
	subscribers: IMember[] | undefined;
	time_amount: number;
	time_records: ITimeRecords[];
	type_work_id: number | null;
	updated_at: string;
	updated_id: number;
	updated_name: string;
	userTimer: IUserTimer | null;
}

interface ITimeRecords {
	description: string | null;
	has_comment: boolean;
	id: number;
	is_approved: boolean;
	is_billable: boolean;
	is_changed: boolean;
	project_issue_id: number;
	record_date: string;
	time_amount: number;
	type_work_id: number;
	type_work_name: string;
	user: { id: number; name: string; avatar: string };
}

interface IDelegateMember extends IMember {
	role: string;
}

interface ITaskInTask {
	completed_on: string | null;
	date_start: string;
	deadline: string | null;
	delegate: IDelegateMember | null;
	delegate_id: number | null;
	hide_from_client: boolean;
	id: number;
	name: string;
	parent_id: number | null;
	project_issue_kanban_id: number;
}

//uploads
interface IFileUpload {
	uuid: string;
	name: string;
	preview_url: string;
	original_url: string;
	size: string;
	mime_type: string;
	extension: string;
}

//docs
interface IDocument {
	id: number;
	type: 'folder' | 'file' | 'notes';
	name: string;
	user: { name: string; avatar: string | null };
	project_id: number;
	parent_id: number | null;
	created_at: string;
	file?: IFileUpload;
}

interface IFolder {
	id: number;
	name: string;
}

interface IDocsStructure {
	id: number;
	type: string;
	name: string;
	parent_id?: number;
	children: IDocsStructure[];
}

//templates
interface ITemplateGroup {
	id: number;
	name: string;
	team_id: number;
	projects: { name: string; slug: string }[];
}

interface ITemplateKanban {
	id: number;
	name: string;
	issues: ITask[];
}

type ITrashItem = ITrashCommonItem | ITrashUserItem | ITrashCommentItem | ITrashDocsItem;

interface ITrashCommonItem {
	id: number;
	entity_id: number;
	entity_name: string;
	item_name: string;
}

interface ITrashUserItem {
	id: number;
	entity_id: number;
	entity_name: 'user';
	additional_info: {
		user_name: string;
		avatar: string | null;
	};
}

interface ITrashCommentItem {
	id: number;
	entity_id: number;
	entity_name: 'comment';
	additional_info: {
		user_comment_by: string;
		user_comment_text: string;
	};
}

interface ITrashDocsItem {
	id: number;
	entity_id: number;
	entity_name: 'docs';
	additional_info?: {
		is_folder: boolean;
	};
}

interface ITrash {
	[key: string]: ITrashItem[];
}

interface IResourcePlanningDates {
	[key: string]: { is_workDay: boolean; is_ready_to_work: boolean; estimate_for_one_day: number };
}

interface IResourcePlanningIssue {
	name: string;
	id: number;
	count_day: number;
	date_start: string;
	deadline: string;
	estimate: number | null;
	estimate_for_one_day_minute: number;
	project_slug: string;
}

interface IResource {
	avatar: string | null;
	id: number;
	name: string;
	teamId: number;
	list: IResourcePlanningDates;
	project_issues: [{ name: string; issues: IResourcePlanningIssue[] }];
}

// reports schedule
interface ISchedule {
	data: IScheduleUser[];
	meta: {
		next_cursor: string | null;
		path: string;
		per_page: number;
		prev_cursor: string | null;
	};
	links: {
		first: string | null;
		last: string | null;
		next: string | null;
		prev: string | null;
	};
}

interface IScheduleUser {
	avatar: string | null;
	id: number;
	name: string;
	team: string;
	teamId: number;
	projects: IScheduleProjects;
	timeUser: ITimeUser;
}
interface ITimeUser {
	sum_time_all_in_minute: number;
	sum_time_all: string;
	is_little: boolean;
	list: { [key: string]: IUserList };
}
interface IUserList {
	is_little: boolean | null;
	is_ready_to_work: boolean | null;
	is_workDay: boolean;
	time: string | null;
	time_in_minute: number | null;
}
interface IScheduleProjects {
	[key: string]: IScheduleProjectInfo;
	team: string;
	teamId: number;
}

interface IScheduleProjectInfo {
	project_slug: string;
	sum_time_all_project: string;
	issues: { [key: string]: IScheduleIssueInfo };
	list: { [key: string]: IScheduleProjectListInfo };
}

interface IScheduleProjectListInfo {
	is_ready_to_work: boolean;
	is_workDay: boolean;
	sum_project_time_for_date: string | null;
	sum_project_time_for_date_in_minute: number | null;
}

interface IScheduleIssueInfo {
	issue_id: number;
	sum_issue_time: string;
	list: { [key: string]: IScheduleIssueListInfo };
}

interface IScheduleIssueListInfo {
	is_ready_to_work: boolean;
	is_workDay: boolean;
	sum_issue_day_time: string | null;
	sum_issue_day_time_in_minute: number | null;
}

// reports projects
interface IProjectReport {
	data: IProjectReportData[];
	meta: {
		next_page_url: string | null;
		path: string;
		per_page: number;
		prev_page_url: string | null;
	};
}

interface IProjectReportData {
	budget_amount: number;
	budget_balance: number | string;
	spent: number;
	budget_type: string;
	client: {
		id: number;
		name: string;
	};
	name: string;
	progress: number;
	slug: string;
	time_amount_project: number;
	type_works: ITypeWorkReport[];
}

interface ITypeWorkReport {
	time_amount_type_work: number;
	type_work: string;
	issue: IIssueReport[];
	spent: number;
}
interface IIssueReport {
	id: number;
	name: string;
	spent: number;
	time_amount_in_hour: number;
}

// reports clients
interface IClientReport {
	data: IClientReportData[];
	meta: {
		next_page_url: string | null;
		path: string;
		per_page: number;
		prev_page_url: string | null;
	};
}

interface IClientReportData {
	budget_amount: number;
	budget_balance: number;
	budget_expenses: number;
	id: number;
	name: string;
	projects: IClientProjectReport[];
}

interface IClientProjectReport {
	budget_amount: number;
	budget_balance: number;
	budget_expenses: number;
	budget_type: string;
	client_id: number;
	name: string;
	slug: string;
}

// reports members
interface IMemberReport {
	data: IMemberReportData[];
	chart: {
		values: number[];
		threshold: number;
	};
	list: {
		last: number;
		num: number;
		type: string;
	}[];
}

interface IMemberReportData {
	avatar: string | null;
	completed_issue: number;
	deviation: number;
	id: number;
	name: string;
	project_estimate_in_hour: string;
	projects: IMemberProjectReport[];
	team_id: number;
	team_name: string;
	time_amount_all: string;
	utilization: number;
}

interface IMemberProjectReport {
	completed_issue: number;
	deviation: number;
	issues: IMemberIssueReport[];
	project_estimate_in_hour: string;
	project_name: string;
	project_slug: string;
	time_amount_all: string;
	utilization: number;
}

interface IMemberIssueReport {
	deviation: number;
	estimate_in_hour: string;
	id: number;
	name: string;
	time_amount_all: string;
	utilization: number;
}

interface IMyWorkTask {
	id: number;
	slug: string;
	name: string;
	project_issues: {
		estimate: number | null;
		id: number;
		name: string;
		project_id: number;
		time_amount: number;
	}[];
}

interface IMyWorkScheduleTask {
	issue_id: number;
	list: {
		[key: string]: {
			is_workDay: boolean;
			sum_issue_day_time: string | null;
			sum_issue_day_time_in_minute: number | null;
		};
	};
	sum_issue_time: string | null;
}

interface IMyWorkScheduleProject {
	issues: {
		[key: string]: IMyWorkScheduleTask;
	};
	list: {
		[key: string]: {
			is_less_time: boolean;
			is_workDay: boolean;
			sum_issue_day_time: string | null;
			sum_issue_day_time_in_minute: number | null;
			sum_project_time_for_date: string | null;
			sum_project_time_for_date_in_minute: number | null;
		};
	};
	project_slug: string;
	sum_time_all: string;
}

interface IMyWorkScheduleProjects {
	[key: string]: IMyWorkScheduleProject;
}

interface IMyWorkScheduleTotal {
	is_less_time: boolean;
	list: {
		[key: string]: {
			is_less_time: boolean;
			is_ready_to_work: boolean;
			is_workDay: boolean;
			time: string | null;
			time_in_minute: number | null;
		};
	};
	sum_time_all: string | null;
	sum_time_all_in_minute: number | null;
}

interface IMyWorkSchedule {
	projects: IMyWorkScheduleProjects;
	total_time_by_date: IMyWorkScheduleTotal;
}

interface IMyWorkReadinessRecord {
	id: number;
	type: string;
	created_at: string;
	date_start: string;
	date_end: string;
	comment: string | null;
	count_day: number;
	status: string;
}

interface IMyWorkReadiness {
	available_vacation_days: number;
	records: {
		[key: string]: IMyWorkReadinessRecord[];
	};
}

interface fetchingDictionaryVacation {
	id: number;
	value: string;
}

interface INewApplication {
	dictionary_type_vacation_id: number;
	date_start: string;
	date_end: string;
	comment?: string;
}

interface IMyWorkApprovalRecord extends IMyWorkReadinessRecord {
	user: {
		id: number;
		name: string;
		avatar: string | null;
	};
}

interface IMyWorkApproval {
	[key: string]: {
		[key: string]: IMyWorkApprovalRecord[];
	};
}

//gantt
interface IGanttProjectIssue {
	id: number;
	name: string;
	date_start: string;
	deadline: string;
	is_finished: boolean;
	is_deleted: boolean;
	count_fact_days: number;
	count_plan_date_start_days: number | null;
	count_plan_deadline_days: number | null;
	plan_date_start: string | null;
	plan_deadline: string | null;
	gant_parent_id: number | null;
	delegate: {
		avatar: string | null;
		id: number;
		name: string;
	} | null;
}

interface IGanttItem {
	id: number;
	name: string;
	time_line: { start_point: string; end_point: string; plan_start_point: string; plan_end_point: string };
	project_issues: IGanttProjectIssue[];
}

interface IManagementPost {
	id: number;
	position: string;
	users_count: number;
}

interface IManagementWorkType {
	id: number;
	type: string;
	cost: number;
}

interface IManagementWeekDays {
	extraDays: string[];
	notWorkDays: string[];
	timeZone: {
		region: string;
		timezone: string;
	};
	workDays: number[];
}

interface fetchingDictionaryRegion {
	id: string;
	value: string;
}

interface fetchingDictionaryTimeZone {
	area: string;
	timezone: string;
}

// уведомления
interface INotifications {
	[key: string]: {
		id: string;
		is_read: boolean;
		label: string | null;
		project: string | null;
		text: string;
		time: string;
		link: string | null;
	}[];
}
