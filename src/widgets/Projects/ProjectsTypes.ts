export interface CurrentGroup {
	id: number;
	name: string;
	projects: ProjectsGroup[];
}

interface ProjectsClient {
	id: number;
	name: string;
}

interface ProjectsManager {
	avatar: null | string;
	email: string;
	id: string;
	name: string;
}

interface ProjectsMembers {
	avatar: null | string;
	email: string;
	id: string;
	name: string;
}

interface ProjectsStatus {
	color: string;
	id: number;
	status: string;
	svg: string;
}

export interface ProjectsGroup {
	budget_amount: number;
	budget_balance: number;
	client: ProjectsClient;
	completion: string;
	date_end: null | string;
	date_start: null | string;
	id: number;
	manager: ProjectsManager;
	members: ProjectsMembers[];
	name: string;
	project_status: ProjectsStatus;
	slug: string;
}
